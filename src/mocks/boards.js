const Board = require('../resources/boards/board.model');

const mockBoards = [
  new Board({
    title: 'home'
  }),
  new Board({
    title: 'work'
  }),
  new Board({
    title: 'hobby'
  })
];

module.exports = mockBoards;
