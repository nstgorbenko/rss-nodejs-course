const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const executeAsync = require('../../helpers/asyncWrapper');

router.route('/').get(
  executeAsync(async (req, res) => {
    const users = await usersService.getAll();
    const rawUsers = users.map(User.toResponse);
    res.status(200).send(rawUsers);
  })
);

router.route('/:id').get(
  executeAsync(async (req, res) => {
    const user = await usersService.get(req.params.id);
    const rawUser = User.toResponse(user);
    res.status(200).send(rawUser);
  })
);

router.route('/').post(
  executeAsync(async (req, res) => {
    const newUser = await usersService.create(req.body);
    const rawUser = User.toResponse(newUser);
    res.status(200).send(rawUser);
  })
);

router.route('/:id').delete(
  executeAsync(async (req, res) => {
    await usersService.remove(req.params.id);
    res.sendStatus(204);
  })
);

router.route('/:id').put(
  executeAsync(async (req, res) => {
    const updatedUser = await usersService.update(req.params.id, req.body);
    const rawUser = User.toResponse(updatedUser);
    res.status(200).send(rawUser);
  })
);

module.exports = router;
