const mongoose = require('mongoose');
const uuid = require('uuid');

const taskSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuid
    },
    title: String,
    order: Number,
    description: String,
    userId: String,
    boardId: String,
    columnId: String
  },
  {
    collection: 'tasks',
    versionKey: false
  }
);

taskSchema.statics.toResponse = ({
  id,
  title,
  order,
  description,
  userId,
  boardId,
  columnId
}) => {
  return { id, title, order, description, userId, boardId, columnId };
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
