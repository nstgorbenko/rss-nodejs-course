const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../common/const');
const { UnauthorizedError } = require('./error');

const checkPassword = async (password, hash) => {
  const isValidPassword = await bcrypt.compare(password, hash);

  if (!isValidPassword) {
    throw new UnauthorizedError('Unauthorized user');
  }

  return isValidPassword;
};

const hashPassword = async password => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hash = await bcrypt.hash(password, salt);

  return hash;
};

module.exports = { checkPassword, hashPassword };
