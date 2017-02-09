// USER MODEL - 
  // represents the entire collection of data in our db
// model is used as a prototype/blueprint of our data, used to create specific instances
// create a new collection of data (users) in our db

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
// mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;
// schema tells us exactly what properties a model will have and what the data will be (name property will have string data)
const UserSchema = new Schema({
  name: String,
});

// use mongoose to create a new user model...
  // this creates a new user collection for us automatically , 2nd argument signifies the schema to use for the model
const User = mongoose.model('user', UserSchema);
// User const represents the ENTIRE COLLECTION OF DATA (not just a single user)

// other files can access user model
module.exports = User;