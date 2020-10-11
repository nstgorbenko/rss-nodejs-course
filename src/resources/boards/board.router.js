const router = require('express').Router();
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();

  res.status(200).send(boards);
});

router.route('/:id').get(async (req, res) => {
  try {
    const board = await boardsService.get(req.params.id);

    res.status(200).send(board);
  } catch (err) {
    res.status(404).send('Board not found');
  }
});

router.route('/').post(async (req, res) => {
  try {
    const newBoard = await boardsService.create(req.body);

    res.status(200).send(newBoard);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    await boardsService.remove(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(404).send('Board not found');
  }
});

router.route('/:id').put(async (req, res) => {
  try {
    const updatedBoard = await boardsService.update(req.params.id, req.body);

    res.status(200).send(updatedBoard);
  } catch (err) {
    res.status(400).send('Bad request');
  }
});

module.exports = router;
