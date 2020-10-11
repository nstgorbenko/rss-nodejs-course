const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();

const get = id => boardsRepo.get(id);

const create = newData => boardsRepo.create(newData);

const remove = id => boardsRepo.remove(id);

const update = (id, newData) => boardsRepo.update(id, newData);

module.exports = { getAll, get, remove, update, create };
