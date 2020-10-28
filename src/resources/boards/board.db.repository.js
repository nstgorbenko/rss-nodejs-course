const Board = require('./board.model');
const { NotFoundError } = require('../../helpers/error');

const getAll = async () => Board.find({});

const get = async id => {
  const board = await Board.findById(id);

  if (!board) {
    throw new NotFoundError('Board not found');
  }

  return board;
};

const create = async newData => {
  const createdBoard = await Board.create(newData);

  if (!createdBoard) {
    throw new NotFoundError('Bad request');
  }

  return createdBoard;
};

const remove = async id => {
  const isRemoved = (await Board.deleteOne({ _id: id })).deletedCount;

  if (!isRemoved) {
    throw new NotFoundError('Board not found');
  }
};

const update = async (id, newData) => {
  await Board.updateOne({ _id: id }, newData);
  const updatedBoard = await get(id);

  if (!updatedBoard) {
    throw new NotFoundError('Board not found');
  }

  return updatedBoard;
};

module.exports = { getAll, get, create, remove, update };
