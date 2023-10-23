const mongoose = require('mongoose');
mongoose.set('strictQuery',true)
// Define a Mongoose Schema
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 255,
},
  category: {
    type: String,
    required: true,
    maxlength: 255,
  },
  body: {
    type: String,
    required: true,
  },
  price:{
    type: String,
    required: true,
  },
  image: {
    type: String,
    required:true,
    
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
  },
});

// Create a Mongoose Model
const Post = mongoose.model('Post', postSchema);

// Export the model for use in your application
module.exports = Post;