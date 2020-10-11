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

class UsersDatabase {
  constructor() {
    this.users = mockUsers;
  }

  getAll() {
    return this.users;
  }

  get(id) {
    const foundUsers = this.users.filter(user => user.id === id);

    if (foundUsers.length > 1) {
      throw new Error('UsersDatabase is wrong. Duplicate user ID');
    }

    return foundUsers[0];
  }

  create(newUser) {
    this.users = [...this.users, newUser];
    return this.get(newUser.id);
  }

  remove(id) {
    const index = this._getUserIndex(id);

    if (index === -1) {
      return false;
    }

    this.users = [
      ...this.users.slice(0, index),
      ...this.users.slice(index + 1)
    ];
    return true;
  }

  update(id, newUser) {
    const index = this._getUserIndex(id);

    if (index === -1) {
      return false;
    }

    this.users = [
      ...this.users.slice(0, index),
      newUser,
      ...this.users.slice(index + 1)
    ];
    return this.get(id);
  }

  _getUserIndex(id) {
    return this.users.findIndex(user => user.id === id);
  }
}

const userDataBase = new UsersDatabase();

module.exports = userDataBase;
