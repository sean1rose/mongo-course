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

  // set + save
    // do this when want to update several properties in separate steps
  it('instance type using set and save', (done) => {
    // call SET and use property that you want to update...    
    joe.set('name', 'Alex');
    // then to persist -> call SAVE on it
    joe.save()
      .then(() => {
        // test that: 1) there's no longer a record named Joe, and 2) there's a record named Alex...
        /*
        User.findOne({name: 'Joe'})
          .then((user) => {
            assert(user === null);

          });
        User.findOne({name: 'Alex'})
          .then((user2) => {
            assert(user2.name === 'Alex');
            done();
          });
        */

        // or retrieve all users and assert there's only 1 user in there, and that it has name of Alex (use FIND w/ criteria of EMPTY OBJ)
          // find({}) -> returns all users in an array
        User.find(({}))
          .then((usersArray) => {
            assert(usersArray.length === 1);
            assert(usersArray[0].name === 'Alex');
            done();
          });

      })
    console.log('Joe - ', joe);
  });
});