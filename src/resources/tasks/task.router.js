const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasks = await tasksService.getAll(req.params.boardId);

  res.status(200).send(tasks);
});

router.route('/:id').get(async (req, res) => {
  try {
    const task = await tasksService.get(req.params.id);

    res.status(200).send(task);
  } catch (err) {
    res.status(404).send('Task not found');
  }
});

router.route('/').post(async (req, res) => {
  try {
    const newTask = await tasksService.create(req.params.boardId, req.body);

    res.status(200).send(newTask);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    await tasksService.remove(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(404).send('Task not found');
  }
});

router.route('/:id').put(async (req, res) => {
  try {
    const updatedTask = await tasksService.update(req.params.id, req.body);

    res.status(200).send(updatedTask);
  } catch (err) {
    res.status(400).send('Bad request');
  }
});

module.exports = router;
