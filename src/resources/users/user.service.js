const usersRepo = require('./user.db.repository');
const { removeUserId: unassignTasks } = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();

const get = id => usersRepo.get(id);

const getByProps = props => usersRepo.getByProps(props);

const create = newData => usersRepo.create(newData);

const remove = async id => {
  await usersRepo.remove(id);
  await unassignTasks(id);
};

const update = (id, newData) => usersRepo.update(id, newData);

module.exports = { getAll, get, getByProps, remove, update, create };
