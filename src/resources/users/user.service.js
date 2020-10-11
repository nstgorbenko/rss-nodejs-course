const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const get = id => usersRepo.get(id);

const create = newData => usersRepo.create(newData);

const remove = id => usersRepo.remove(id);

const update = (id, newData) => usersRepo.update(id, newData);

module.exports = { getAll, get, remove, update, create };
