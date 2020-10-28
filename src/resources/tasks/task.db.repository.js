const Task = require('./task.model');
const { NotFoundError } = require('../../helpers/error');

const getAll = async boardId => await Task.find({ boardId });

const get = async id => {
  const task = await Task.findOne({ _id: id });

  if (!task) {
    throw new NotFoundError('Task not found');
  }

  return task;
};

const create = async (boardId, newData) => {
  const createdTask = Task.create({ ...newData, boardId });

  if (!createdTask) {
    throw new NotFoundError('Bad request');
  }

  return createdTask;
};

const remove = async id => {
  const isRemoved = (await Task.deleteOne({ _id: id })).deletedCount;

  if (!isRemoved) {
    throw new NotFoundError('Task not found');
  }
};

const removeByBoardId = async boardId => {
  await Task.deleteMany({ boardId });
};

const removeUserId = async userId => {
  await Task.updateMany({ userId }, { userId: null });
};

const update = async (id, newData) => {
  await Task.updateOne({ _id: id }, newData);
  const updatedTask = await get(id);

  if (!updatedTask) {
    throw new NotFoundError('Task not found');
  }

  return updatedTask;
};

module.exports = {
  getAll,
  get,
  create,
  remove,
  removeByBoardId,
  removeUserId,
  update
};
