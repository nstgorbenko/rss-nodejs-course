const DB = require('../../mocks/inMemoryDB');
const Board = require('./board.model');
const { NotFoundError } = require('../../helpers/error');

const NAME_SPACE = 'boards';

const getAll = async () => await DB.getAll(NAME_SPACE);

const get = async id => {
  const board = await DB.get(NAME_SPACE, id);

  if (!board) {
    throw new NotFoundError('Board not found');
  }

  return board;
};

const create = async newData => {
  const newBoard = new Board(newData);
  const createdBoard = await DB.create(NAME_SPACE, newBoard);

  if (!createdBoard) {
    throw new NotFoundError('Bad request');
  }

  return createdBoard;
};

const remove = async id => {
  const isRemoved = await DB.remove(NAME_SPACE, id);

  if (!isRemoved) {
    throw new NotFoundError('Board not found');
  }
};

const update = async (id, newData) => {
  const oldBoard = await DB.get(NAME_SPACE, id);
  const newBoard = Object.assign({}, oldBoard, newData);
  const updatedBoard = await DB.update(NAME_SPACE, id, new Board(newBoard));

  if (updatedBoard === false) {
    throw new NotFoundError('Board not found');
  }

  return updatedBoard;
};

module.exports = { getAll, get, create, remove, update };
