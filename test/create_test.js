// purpose: using mocha, this file makes sure we can create a new user record and save to the db

// used to make an assertion w/in our it block
const assert = require('assert');
// import in our user model, which represents our entire collection our data that sits inide of our database
const User = require('../src/user');


// want to empty database before running our tests *HOOK*


describe('Creating records', () => {
  // use it func to make an assertion - compares 1 value to another (i hope that this value is equal to this value)
  it('saves a user', () => {
    // 1. create new instance of the user model (this doesn't save to the db)
    const sean = new User({name: 'Sean'});
    
    // 2. save user (insert record into database)
    sean.save();

    // 3. assert it was saved
  });
});
