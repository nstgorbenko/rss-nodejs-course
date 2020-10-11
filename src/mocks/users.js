const User = require('../resources/users/user.model');

const mockUsers = [
  new User({
    name: 'John',
    login: 'johnny',
    password: 'johnny111'
  }),
  new User({
    name: 'Ronald',
    login: 'ron',
    password: 'ron222'
  }),
  new User({
    name: 'William',
    login: 'will',
    password: 'will333'
  })
];

module.exports = mockUsers;
