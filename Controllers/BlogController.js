const Blog = require('../Models/Blog');

exports.blog_get_all = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs)
  }catch(error){
    res.json({message: error})
  }
};

exports.blog_create = async (req, res) => {
  const blog = new Blog(req.body);
  try {
    const savedBlog = await blog.save();
    res.send(savedBlog)
  }catch(error){
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
    const blog = await Blog.updateOne({_id: req.params.blogId},
      {$set: req.body}
    );
    res.json({message:"Success ", body: blog})
  }catch(error){
    res.status(404).json({status: 'failed', message: error.message })
  }
};

exports.blog_delete = async (req, res) => {
  try {
    const blog = await Blog.deleteOne({_id: req.params.blogId});
    res.json(blog)
  }catch(error){
    res.status(404).json({status: 'failed', message: error.message })
  }
};

