const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {
  // add before each to create a new user, joe and save to db. so in each it block, will remove that instance of joe
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    joe.save()
      .then(() => done());
  });

  // this is on the SINGLE joe model INSTANCE (as opposed to entire User class). remove 1 specific instance.
  it('model instance remove', (done) => {
    // testing remove function...
    // remove joe -> then callback -> then search thru collection looking for joe -> then callback -> then whatever user is returned from that search, assert it doesnt exist (cuz he was deleted)
      // 2 promises executed sequentially.
    joe.remove()
      .then(() => {
        // 1st then is promise returned from running the remove method...
        User.findOne({ name: 'Joe' })
          .then((user) => {
            // 2nd then is w/ the user that was found w/ the findOne method (or lack thereof)
            assert(user === null);
            done();
          })
      });
      /* THIS IS ALTERNATIVE CODE TO THE ABOVE ^^^...
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
      })
      */
  });

  // this is on entire User class...
  it('class method remove', (done) => {
    // use this when you want to remove a BUNCH of records w/ some given criteria. METHOD ON THE CLASS (not a single instance)
    User.remove({ name: 'Joe' })
      .then(() => {
        User.find({name: 'Joe'})
          .then((usersArray) => {
            assert(usersArray.length === 0);
            done();
          });
      });

  });

  // for finding a particular record (can use id or any other criteria - 1st record that matches is removed)...
  it('class method findOneAndRemove', (done) => {
    User.findOneAndRemove({ name: 'Joe' })
      .then(() => {
        User.findOne({ name: 'Joe' })
          .then((user) => {
            assert(user === null);
            done();
          });
      });
  });

  // same as findOneAndRemove, but using id (could use findOneAndRemove w/ id)
  it ('class method findByIdAndRemove', (done) => {
      // do NOT have to pass in an object here, can just pass in id
    // User.findByIdAndRemove({ _id: joe.id })
    User.findByIdAndRemove(joe._id)
      .then(() => {
        User.findOne({ _id: joe._id })
          .then((user) => {
            assert(user === null);
            done();
          })
      })
  });
});