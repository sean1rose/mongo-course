// USER MODEL
  // represents the entire collection of data in our db
// model is used as a prototype/blueprint of our data, used to create specific instances
// create a new collection of data (users) in our db

const mongoose = require('mongoose');

// need to wire up this post schema to User model/schema...
const PostSchema = require('./post');
// User schema needs an embedded list of Posts..
  // -> represented by a property ('posts') on the UserSchema, which is an array/list of PostSchema
    // posts: [PostSchema]

mongoose.Promise = require('bluebird');
// mongoose.Promise = global.Promise;

// instantiate mongoose schema...
const Schema = mongoose.Schema;
// SCHEMA tells us exactly what properties a model will have and what the data will be (name property will have string data)

// create schema (which is gonna be used for User Model)
  // use object for validation (see name property, which has a 'required' property, and length requirement in validator function in 'validate' property)
const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) =>  name.length >= 2,
      message: 'Name must be longer than 2 characters.'
    },
    required: [true, 'Name is required.']
  },
  postCount: Number,
  posts: [PostSchema]
});
  // ^ User schema has an embedded list of Posts (post schema)

// use mongoose to CREATE a new USER MODEL based on the above ^ defined SCHEMA...
  // this creates a new user collection for us automatically , 2nd argument signifies the schema to use for the model
const User = mongoose.model('user', UserSchema);
// User const represents the ENTIRE COLLECTION OF DATA (not just a single user)

// other files can access user model
module.exports = User;