// initial set up for our tests..

const mongoose = require('mongoose');

// tell mongoose to connect to the local instance of mongodb. 'users_test' is the database in our mongodb instance
// don't need to create database beforehand; by connecting mongoose, it's created...
mongoose.connect('mongodb://localhost/users_test');

// 'once' event handler -> watch for mongoose to omit 'open' event -> so this lets us know when the mongoose connection to mongodb is good to go...
mongoose.connection
  .once('open', () => console.log('mongoose connection to mongodb is litty!'))
  .on('error', (error) => {
    console.warn('Warning - ', error);
  });