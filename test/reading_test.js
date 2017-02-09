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
  it('finds all users w/ a name of Sean', (done) => {
    // query db to find a list of all users w/ name of sean
    // use mongo class-method
      // User.find(criteria) returns an array vs User.findOne(criteria) returns the first record that matches
    User.find({name: 'Sean'})
      .then((usersArray) => {
        // assert that user is the same user as the one we inserted beforeeach... Use _id property....
        
        // console.log('sean._id - ', sean._id);
        // console.log('array[0] - ', usersArray[0]._id);
        
        // ^^^ the _ids match, but need to use 'equals()' method OR use toString() method cuz the _id's are object ids
        // assert(sean._id.equals(usersArray[0]._id));
        assert(sean._id.toString() === usersArray[0]._id.toString());
        done();
      });
  });

});

