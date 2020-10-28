const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');
const executeAsync = require('../../helpers/asyncWrapper');
const Task = require('./task.model');

router.route('/').get(
  executeAsync(async (req, res) => {
    const tasks = await tasksService.getAll(req.params.boardId);
    await res.status(200).send(tasks.map(Task.toResponse));
  })
);

router.route('/:id').get(
  executeAsync(async (req, res) => {
    const task = await tasksService.get(req.params.id);
    await res.status(200).send(Task.toResponse(task));
  })
);

router.route('/').post(
  executeAsync(async (req, res) => {
    const newTask = await tasksService.create(req.params.boardId, req.body);
    await res.status(200).send(Task.toResponse(newTask));
  })
);

router.route('/:id').delete(
  executeAsync(async (req, res) => {
    await tasksService.remove(req.params.id);
    await res.sendStatus(204);
  })
);

router.route('/:id').put(
  executeAsync(async (req, res) => {
    const updatedTask = await tasksService.update(req.params.id, req.body);
    await res.status(200).send(Task.toResponse(updatedTask));
  })
);

module.exports = router;
