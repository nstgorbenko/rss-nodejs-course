const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  const rawUsers = users.map(User.toResponse);

  res.status(200).send(rawUsers);
});

router.route('/:id').get(async (req, res) => {
  try {
    const user = await usersService.get(req.params.id);
    const rawUser = User.toResponse(user);

    res.status(200).send(rawUser);
  } catch (err) {
    res.status(404).send('User not found');
  }
});

router.route('/').post(async (req, res) => {
  try {
    const newUser = await usersService.create(req.body);
    const rawUser = User.toResponse(newUser);

    res.status(200).send(rawUser);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    await usersService.remove(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(404).send('User not found');
  }
});

router.route('/:id').put(async (req, res) => {
  try {
    const updatedUser = await usersService.update(req.params.id, req.body);
    const rawUser = User.toResponse(updatedUser);

    res.status(200).send(User.toResponse(rawUser));
  } catch (err) {
    res.status(400).send('Bad request');
  }
});

module.exports = router;
