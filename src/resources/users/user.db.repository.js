const { ForbiddenError, NotFoundError } = require('../../helpers/error');
const User = require('./user.model');

const getAll = async () => User.find({});

const get = async id => {
  const user = await User.findOne({ _id: id });

  if (!user) {
    throw new NotFoundError('User not found');
  }

  return user;
};

const getByProps = async props => {
  const user = await User.findOne(props);

  if (!user) {
    throw new ForbiddenError('Forbidden');
  }

  return user;
};

const create = async newData => {
  const createdUser = await User.create(newData);

  if (!createdUser) {
    throw new NotFoundError('Bad request');
  }

  return createdUser;
};

const remove = async id => {
  const isRemoved = (await User.deleteOne({ _id: id })).deletedCount;

  if (!isRemoved) {
    throw new NotFoundError('User not found');
  }
};

const update = async (id, newData) => {
  await User.updateOne({ _id: id }, newData);
  const updatedUser = await get(id);

  if (!updatedUser) {
    throw new NotFoundError('User not found');
  }

  return updatedUser;
};

module.exports = { getAll, get, getByProps, create, remove, update };
