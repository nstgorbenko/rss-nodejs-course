const Task = require('../resources/tasks/task.model');

const mockTasks = [
  new Task({
    title: 'kitchen',
    description: 'wash the dishes',
    order: 0,
    boardId: 'board-1'
  }),
  new Task({
    title: 'hall',
    description: 'change the flowers',
    order: 0,
    boardId: 'board-1'
  }),
  new Task({
    title: 'weekly report',
    description: 'get sales stats',
    order: 0,
    userId: 'user-1',
    boardId: 'board-2'
  })
];

module.exports = mockTasks;
