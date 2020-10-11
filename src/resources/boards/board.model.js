const uuid = require('uuid');

class Board {
  constructor({
    id = uuid(),
    title = 'boardTitle',
    columns = [{ id: uuid(), title: 'columnTitle', order: 0 }]
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

module.exports = Board;
