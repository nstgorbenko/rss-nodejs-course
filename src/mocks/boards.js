const Board = require('../resources/boards/board.model');

const mockBoards = [
  new Board({
    id: 'board-1',
    title: 'home'
  }),
  new Board({
    id: 'board-2',
    title: 'work'
  }),
  new Board({
    title: 'hobby'
  })
];

module.exports = mockBoards;
