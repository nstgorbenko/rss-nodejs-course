const jwt = require('jsonwebtoken');
const { getByProps: getUserByAuthData } = require('../users/user.service');
const { JWT_SECRET_KEY } = require('../../common/config');
const { checkPassword } = require('../../helpers/hasher');

const getToken = async (login, password) => {
  const user = await getUserByAuthData({ login });
  const { id, password: hashedPassword } = user;

  await checkPassword(password, hashedPassword);
  const token = jwt.sign({ id, login }, JWT_SECRET_KEY);
  return token;
};

module.exports = { getToken };
