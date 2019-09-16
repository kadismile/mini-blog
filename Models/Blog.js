const mongoose = require('mongoose');
var randomstring = require("randomstring");

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
  views: {
    type: String
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

module.exports = mongoose.model('Blogs', BlogSchema);