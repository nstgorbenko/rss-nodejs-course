const router = require('express').Router();
const boardsService = require('./board.service');
const executeAsync = require('../../helpers/asyncWrapper');
const Board = require('./board.model');

router.route('/').get(
  executeAsync(async (req, res) => {
    const boards = await boardsService.getAll();
    await res.status(200).send(boards.map(Board.toResponse));
  })
);

router.route('/:id').get(
  executeAsync(async (req, res) => {
    const board = await boardsService.get(req.params.id);
    await res.status(200).send(Board.toResponse(board));
  })
);

router.route('/').post(
  executeAsync(async (req, res) => {
    const newBoard = await boardsService.create(req.body);
    await res.status(200).send(Board.toResponse(newBoard));
  })
);

router.route('/:id').delete(
  executeAsync(async (req, res) => {
    await boardsService.remove(req.params.id);
    await res.sendStatus(204);
  })
);

router.route('/:id').put(
  executeAsync(async (req, res) => {
    const updatedBoard = await boardsService.update(req.params.id, req.body);
    await res.status(200).send(Board.toResponse(updatedBoard));
  })
);

module.exports = router;
