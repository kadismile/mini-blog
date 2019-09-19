const Blog = require('../Models/Blog');
const path = require("path");
const cloudinary = require('../config/cloudinary');
const multer = require("multer");
const storage = multer.diskStorage({
  /*destination: "./public/uploads/",*/
  filename: function(req, file, cb){
    cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
}).single("myImage");

exports.blog_get_all = async (req, res) => {
  try {
    const skip = Number(req.params.skip);
    const blogs = await Blog.find().sort({createdAt: -1}).skip(skip);
    res.json(blogs)
  }catch(error){
    res.json({message: error})
  }
};

exports.blog_create = async (req, res) => {
  try {
    await upload(req, res, async (err) => {
      let blogDetails = req.body;
      await cloudinary.uploader.upload(
        req.file.path,
        {public_id: blogDetails.filename},
        function(error, result) {
          blogDetails.imageUrl = result.url;
          blogDetails.public_id = result.public_id;
        }
      );
      const blog = new Blog(blogDetails);
      await blog.save();
      if(!err){
        return res.send(200).end();
      }
      res.sendStatus(blogDetails)
    });

  }catch(error){
    console.log("\x1b[31m" ,error.message);
    res.status(500).json({status: 'failed', message: error.message })
  }
};

exports.blog_find_one = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogId);
    res.json(blog)
  }catch(error){
    res.status(404).json({status: 'failed', message: error.message })
  }
};

exports.blog_update = async (req, res) => {
  try {
    await upload(req, res, async (err) => {
      let blogDetails = req.body;
      if(req.file){
        //remove old image from cloudinary
        const blog = await Blog.findById(req.params.blogId);
        await cloudinary.uploader.destroy(blog.public_id, function(result) { console.log(result) });
        await cloudinary.uploader.upload(
          req.file.path,
          {public_id: blogDetails.filename},
          function (error, result) {
            blogDetails.imageUrl = result.url;
          });
        await Blog.updateOne({ _id: req.params.blogId }, { $set: blogDetails });
      }else{
        blogDetails.imageUrl = blogDetails.myImage;
        delete blogDetails.myImage;
        await Blog.updateOne({ _id: req.params.blogId }, { $set: blogDetails });
      }
      if(!err){
        return res.sendStatus(200).end();
      }
      res.sendStatus(blogDetails)
    });

  }catch(error){
    console.log("\x1b[31m" ,error.message);
    res.status(500).json({status: 'failed', message: error.message })
  }
};

exports.blog_delete = async (req, res) => {
  try {
    const filename = await Blog.findById(req.params.blogId);
    await cloudinary.uploader.destroy(filename.filename, function(result) { console.log(result) });
    const blog = await Blog.deleteOne({_id: req.params.blogId});
    res.json(blog)
  }catch(error){
    res.status(404).json({status: 'failed', message: error.message })
  }
};