const mongoose = require('mongoose');

// we create schema/blueprint
const postSchema = mongoose.Schema({
  title: { type: String, required: true},
  content: { type: String, required: true},
  imagePath: { type: String, required: true},
  // id type and referes to model User => Id belonging to a user
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
});

// turn schema in to a model and export
module.exports = mongoose.model('Post', postSchema);
