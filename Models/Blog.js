const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  categoryId: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  views: {
    type: String
  },
  commentId: {
    type: String
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