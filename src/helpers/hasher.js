const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../common/const');

const checkPassword = async (password, hash) =>
  await bcrypt.compare(password, hash);

const hashPassword = async password => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hash = await bcrypt.hash(password, salt);

  return hash;
};

module.exports = { checkPassword, hashPassword };
