const jwt = require('jsonwebtoken');
const { getByProps: getUserByAuthData } = require('../users/user.service');
const { JWT_SECRET_KEY } = require('../../common/config');

const getToken = async (login, password) => {
  const user = await getUserByAuthData({ login, password });

  const { id } = user;
  const token = jwt.sign({ id, login }, JWT_SECRET_KEY);
  return token;
};

module.exports = { getToken };
