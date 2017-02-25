const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
  it('requires a user name', () => {
    // test where we create a new user w/o a name, validate so see error msg if no user name...
    const user = new User({ name: undefined });
    
    // don't save, but validate by calling validateSync()... 
      // -> returns an error object, which has all the validation results, and an 'errors' property w/ an obj w/ a message property (super nested property)
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;

    assert(message === 'Name is required.');

  });

  it('requires that user\'s name is >= 2 characters', () => {
    const user = new User({ name: 'G' });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    
    assert(message === 'Name must be longer than 2 characters.')
  });

  it('disallows invalid records from being saved', (done) => {
    // attempt to save w/ validating -> should fail
    const user = new User({ name: 'T' });
    user.save()
      .catch((validationResult) => {
        const { message } = validationResult.errors.name;
        
        assert(message === 'Name must be longer than 2 characters.');
        done();
      });
  })
});