// POST IS JUST A SCHEMA (not a model)
  // will not map to a distinct collection of posts inside our mongo db
  // need to wire up this post schema to User model/schema

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: String
});

module.exports = PostSchema;