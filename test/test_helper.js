// initial set up for our tests..

const mongoose = require('mongoose');

// tell mongoose to CONNECT our local instance of mongodb. 'users_test' is the database in our mongodb instance
// don't need to create database beforehand; by connecting mongoose, it's created...
mongoose.connect('mongodb://localhost/users_test');

// 'once' event handler -> watch for mongoose to omit 'open' event -> so this lets us know when the mongoose connection to mongodb is good to go...
mongoose.connection
  .once('open', () => console.log('mongoose connection to mongodb is litty!'))
  .on('error', (error) => {
    console.warn('Warning - ', error);
});

// clear out all users BEFORE each test...
beforeEach((done) => {
  // reference to our collection of user in our db -> drop it/remove those records
    // drop has a callback function so can use it to call next test -> call done
  mongoose.connection.collections.users.drop(() => {
    // after collection is dropped -> signal to mocha that can run next test...
    done();
  })
})


