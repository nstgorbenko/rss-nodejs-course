const router = require('express').Router();
const loginService = require('./login.service');
const executeAsync = require('../../helpers/asyncWrapper');

router.route('/').post(
  executeAsync(async (req, res) => {
    const { login, password } = req.body;
    const token = await loginService.getToken(login, password);
    await res.status(200).send(token);
  })
);

module.exports = router;
