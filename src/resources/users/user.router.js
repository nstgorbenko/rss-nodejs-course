const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const executeAsync = require('../../helpers/asyncWrapper');

router.route('/').get(
  executeAsync(async (req, res) => {
    const users = await usersService.getAll();
    await res.status(200).send(users.map(User.toResponse));
  })
);

router.route('/:id').get(
  executeAsync(async (req, res) => {
    const user = await usersService.get(req.params.id);
    console.log(user);
    await res.status(200).send(User.toResponse(user));
  })
);

router.route('/').post(
  executeAsync(async (req, res) => {
    const newUser = await usersService.create(req.body);
    await res.status(200).send(User.toResponse(newUser));
  })
);

router.route('/:id').delete(
  executeAsync(async (req, res) => {
    await usersService.remove(req.params.id);
    await res.sendStatus(204);
  })
);

router.route('/:id').put(
  executeAsync(async (req, res) => {
    const updatedUser = await usersService.update(req.params.id, req.body);
    await res.status(200).send(User.toResponse(updatedUser));
  })
);

module.exports = router;
