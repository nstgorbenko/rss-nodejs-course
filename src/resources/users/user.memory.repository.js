const DB = require('../../common/inMemoryDB');
const User = require('./user.model');

const getAll = async () => await DB.getAll();

const get = async id => {
  const user = await DB.get(id);

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

const create = async newData => {
  const newUser = new User(newData);
  return await DB.create(newUser);
};

const remove = async id => {
  const isRemoved = await DB.remove(id);

  if (!isRemoved) {
    throw new Error('User not found');
  }
};

const update = async (id, newData) => {
  const oldUser = await DB.get(id);
  const newUser = Object.assign({}, oldUser, newData);
  const updatedUser = await DB.update(id, new User(newUser));

  if (updatedUser === false) {
    throw new Error('User not found');
  }

  return updatedUser;
};

module.exports = { getAll, get, create, remove, update };
