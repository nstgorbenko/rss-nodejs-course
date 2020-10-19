const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');
const executeAsync = require('../../helpers/asyncWrapper');

router.route('/').get(
  executeAsync(async (req, res) => {
    const tasks = await tasksService.getAll(req.params.boardId);
    res.status(200).send(tasks);
  })
);

router.route('/:id').get(
  executeAsync(async (req, res) => {
    const task = await tasksService.get(req.params.id);
    res.status(200).send(task);
  })
);

router.route('/').post(
  executeAsync(async (req, res) => {
    const newTask = await tasksService.create(req.params.boardId, req.body);
    res.status(200).send(newTask);
  })
);

router.route('/:id').delete(
  executeAsync(async (req, res) => {
    await tasksService.remove(req.params.id);
    res.sendStatus(204);
  })
);

router.route('/:id').put(
  executeAsync(async (req, res) => {
    const updatedTask = await tasksService.update(req.params.id, req.body);
    res.status(200).send(updatedTask);
  })
);

module.exports = router;
