const boardsRepo = require('./board.db.repository');
const { removeByBoardId: removeBoardTasks } = require('../tasks/task.service');

const getAll = () => boardsRepo.getAll();

const get = id => boardsRepo.get(id);

const create = newData => boardsRepo.create(newData);

const remove = async id => {
  await boardsRepo.remove(id);
  await removeBoardTasks(id);
};

const update = (id, newData) => boardsRepo.update(id, newData);

module.exports = { getAll, get, remove, update, create };
