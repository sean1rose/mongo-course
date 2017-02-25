// boilerplate
const assert = require('assert');
const User = require('../src/user');
const ObjectID = require('mongodb').ObjectID;

describe('Reading users out of the db', () => {
  // declare sean variable so can be accessed from w/in each it block...
  let sean;

  // insert record w/ name Sean before running test...
  beforeEach((done) => {
    sean = new User({ name: 'Sean' });
    sean.save()
      .then(() => done());
    // save sean, then continue w/ rest of tests we want to run (done())...
  });

  // finding all the users w/ name sean...
    // since it's an asyncrhonous test (will take time to complete) -> must use done callback
    // FIND -> RETURNS AN ARRAY OF RECORDS
  it('finds all users w/ a name of Sean', (done) => {
    // query db to find a list of all users w/ name of sean
    // use mongo class-method
      // User.find(criteria) returns an array vs User.findOne(criteria) returns the first record that matches
    User.find({name: 'Sean'})
      .then((users) => {
        // assert that user is the same user as the one we inserted beforeeach... Use _id property....
        
        // console.log('sean._id - ', sean._id);
        // console.log('array[0] - ', users[0]._id);
        
        // ^^^ the _ids match, but need to use 'equals()' method OR use toString() method cuz the _id's are object ids and doing a comparison
        // assert(sean._id.equals(users[0]._id));
        assert(sean._id.toString() === users[0]._id.toString());
        done();
      });
  });

  // find one user w/ id 
    // FINDONE -> returns a single record
  it('find a user w/ a particular id', (done) => {
    // need to pass in object to serve as criteria of your findOne search...
    User.findOne({ _id: sean._id})
      .then((user) => {
        // console.log('user - ', user);
        assert(user.name === 'Sean');
        done();
      });
  });

});

