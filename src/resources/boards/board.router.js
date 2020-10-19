const router = require('express').Router();
const boardsService = require('./board.service');
const executeAsync = require('../../helpers/asyncWrapper');

router.route('/').get(
  executeAsync(async (req, res) => {
    const boards = await boardsService.getAll();
    res.status(200).send(boards);
  })
);

router.route('/:id').get(
  executeAsync(async (req, res) => {
    const board = await boardsService.get(req.params.id);
    res.status(200).send(board);
  })
);

router.route('/').post(
  executeAsync(async (req, res) => {
    const newBoard = await boardsService.create(req.body);
    res.status(200).send(newBoard);
  })
);

router.route('/:id').delete(
  executeAsync(async (req, res) => {
    await boardsService.remove(req.params.id);
    res.sendStatus(204);
  })
);

router.route('/:id').put(
  executeAsync(async (req, res) => {
    const updatedBoard = await boardsService.update(req.params.id, req.body);
    res.status(200).send(updatedBoard);
  })
);

module.exports = router;
