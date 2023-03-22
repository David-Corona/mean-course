const mongoose = require('mongoose');

// we create schema/blueprint
const postSchema = mongoose.Schema({
  title: { type: String, required: true},
  content: { type: String, required: true}
});

// turn schema in to a model and export
module.export = mongoose.model('Post', postSchema);
