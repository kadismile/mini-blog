const mongoose = require('mongoose');
const randomstring = require("randomstring");

const BlogSchema = mongoose.Schema({
 _id: {
   type: String,
   default: function() {
     if (this.title) {
       return randomstring.generate();
     }
     return null;
   }
 },
  title: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  categoryId: {
    type: String,
    required: false
  },
  category: {
    type: String,
    required: false
  },
  author: {
    type: String,
    required: false
  },
  slug: {
    type: String,
    default: function() {
      if (this.title) {
        let slug = this.title.replace(/\s+/g, '-').toLowerCase();
        return `${slug}-${this._id}`;
      }
      return null;
    }
  },
  commentId: {
    type: String
  },
  filename: {
    type: String,
    required: false
  },
  imageUrl: {
    type: String,
    required: false
  },
  public_id: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }

});

//this is the hook after insert
BlogSchema.post("save", async function(doc) {
  console.log('Inserted finished Again.', doc);
});

//this is the hook after update
BlogSchema.post("findOneAndUpdate", async function(oldDoc, next) {
  let newDoc = this.getUpdate().$set ;

  if(oldDoc.title !== newDoc.title){
    try{
      let slug = newDoc.title.replace(/\s+/g, '-').toLowerCase();
      newDoc.slug = `${slug}-${oldDoc._id}`;
      await this.updateOne({ _id: oldDoc._id }, { $set: newDoc });
    }catch (e) {
      return next(e);
    }
  }
  return next();
});



module.exports = mongoose.model('Blogs', BlogSchema);