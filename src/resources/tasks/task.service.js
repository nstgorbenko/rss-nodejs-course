const tasksRepo = require('./task.db.repository');

const getAll = boardId => tasksRepo.getAll(boardId);

const get = id => tasksRepo.get(id);

const create = (boardId, newData) => tasksRepo.create(boardId, newData);

const remove = id => tasksRepo.remove(id);

const removeByBoardId = boardId => tasksRepo.removeByBoardId(boardId);

const removeUserId = userId => tasksRepo.removeUserId(userId);

const update = (id, newData) => tasksRepo.update(id, newData);

module.exports = {
  getAll,
  get,
  remove,
  removeByBoardId,
  removeUserId,
  update,
  create
};
