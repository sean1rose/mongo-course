// purpose: using mocha, this file makes sure we can create a new user record and save to the db

// used to make an assertion w/in our it block
const assert = require('assert');
// import in our user model, which represents our entire collection our data that sits inide of our database
const User = require('../src/user');


// want to empty database before running our tests *HOOK*

describe('Creating records', () => {
  // use it func to make an assertion - compares 1 value to another (i hope that this value is equal to this value)
    //***note: done is available in each it block and beforeEach method in mocha; once it's referenced in arguments, need to make sure to call it!
  it('saves a user', (done) => {
    // 1. create new instance of the user model (this doesn't save to the db)
    const sean = new User({name: 'Sean'});
    
    // 2. save user takes time to do... (inserts record into database, which is an asyncronous method, which means using a PROMISE!)
      // save returns a promise, which when resolved -> user has been saved to the db.
    sean.save()
      .then(() => {
        // has sean been saved to our db? use mongoose method isNew (if hasn't been saved to mongodb then isNew is true, and vice versa)
        
        // 3. assert it was saved / assert it's not new (if sean is not new then sean has already been saved to db)
        assert(!sean.isNew);
        // if done statement isn't reached, that means our test failed...
        done();
      });

  });
});
