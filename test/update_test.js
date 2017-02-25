const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
  let joe;
  // declare user ahead of time w/ beforeEach
  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    joe.save()
      .then(() => done());
  });

  // HELPER FUNCTION -> checks/asserts to make sure user in db is updated w/ name from Joe to Alex...
  function assertName(operation, done) {
    // take operation obj, which is a promise... EXAMPLE: assertName(joe.save())
    operation
      .then(() => {
        User.find({})
          .then((users) => {
            assert(users.length === 1);
            assert(users[0].name === 'Alex');
            done();
          });
      });
  }

  // set + save model instance method
    // do this when want to update several properties in separate steps
  it('instance type using set and save', (done) => {
    // call SET and use property that you want to update...    
    joe.set('name', 'Alex');
    // then to persist -> call SAVE on it
    assertName(joe.save(), done);
    // the 1 line above is a substitute for the code below...
    
    /*
    joe.save()
      .then(() => {
        // test that: 1) there's no longer a record named Joe, and 2) there's a record named Alex...
        // or retrieve all users and assert there's only 1 user in there, and that it has name of Alex (use FIND w/ criteria of EMPTY OBJ)
          // find({}) -> returns all users in an array
        User.find(({}))
          .then((usersArray) => {
            assert(usersArray.length === 1);
            assert(usersArray[0].name === 'Alex');
            done();
          });

      });
      */
    console.log('Joe - ', joe);
  });

  // UPDATE() model - instance method - to update a specific property
    // use this bulk functionality when we want to update a couple of records and save instantly...
  it('a model instance can update', (done) => {
    // pass in object w/ new property/value we want updated
    assertName(joe.update({ name: 'Alex' }), done);
  });
});