const DB = require('../../mocks/inMemoryDB');
const Task = require('./task.model');

const NAME_SPACE = 'tasks';

const getAll = async boardId =>
  await DB.getAll(NAME_SPACE).filter(task => task.boardId === boardId);

const get = async id => {
  const task = await DB.get(NAME_SPACE, id);

  if (!task) {
    throw new Error('Task not found');
  }

  return task;
};

const create = async (boardId, newData) => {
  const newTask = new Task(Object.assign({}, newData, { boardId }));
  return await DB.create(NAME_SPACE, newTask);
};

const remove = async id => {
  const isRemoved = await DB.remove(NAME_SPACE, id);

  if (!isRemoved) {
    throw new Error('Task not found');
  }
};

const removeByBoardId = async boardId => {
  const boardTasks = await getAll(boardId);

  if (boardTasks.length > 0) {
    boardTasks.forEach(async task => await remove(task.id));
  }
};

const removeUserId = async userId => {
  const userTasks = await DB.getAll(NAME_SPACE).filter(
    task => task.userId === userId
  );
  if (userTasks.length > 0) {
    userTasks.forEach(async task => {
      const newTask = Object.assign({}, task, { userId: null });
      await DB.update(NAME_SPACE, task.id, new Task(newTask));
    });
  }
};

const update = async (id, newData) => {
  const oldTask = await DB.get(NAME_SPACE, id);
  const newTask = Object.assign({}, oldTask, newData);
  const updatedTask = await DB.update(NAME_SPACE, id, new Task(newTask));

  if (updatedTask === false) {
    throw new Error('Task not found');
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
