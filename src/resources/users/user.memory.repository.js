const DB = require('../../mocks/inMemoryDB');
const User = require('./user.model');

const NAME_SPACE = 'users';

const getAll = async () => await DB.getAll(NAME_SPACE);

const get = async id => {
  const user = await DB.get(NAME_SPACE, id);

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

const create = async newData => {
  const newUser = new User(newData);
  return await DB.create(NAME_SPACE, newUser);
};

const remove = async id => {
  const isRemoved = await DB.remove(NAME_SPACE, id);

  if (!isRemoved) {
    throw new Error('User not found');
  }
};

const update = async (id, newData) => {
  const oldUser = await DB.get(NAME_SPACE, id);
  const newUser = Object.assign({}, oldUser, newData);
  const updatedUser = await DB.update(NAME_SPACE, id, new User(newUser));

  if (updatedUser === false) {
    throw new Error('User not found');
  }

  return updatedUser;
};

module.exports = { getAll, get, create, remove, update };
