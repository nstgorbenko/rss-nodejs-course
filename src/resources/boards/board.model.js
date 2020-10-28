const mongoose = require('mongoose');
const uuid = require('uuid');

const boardSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuid
    },
    title: {
      type: String,
      default: 'board-name'
    },
    columns: [
      {
        title: String,
        order: Number
      }
    ]
  },
  {
    collection: 'boards',
    versionKey: false
  }
);

boardSchema.statics.toResponse = ({ id, title, columns }) => {
  return { id, title, columns };
};

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
