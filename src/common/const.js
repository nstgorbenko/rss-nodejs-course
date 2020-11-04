const ADMIN = {
  name: 'Admin',
  login: 'admin',
  password: 'admin'
};

const NO_AUTH_PATHS = ['/', '/doc', '/login'];

const SALT_ROUNDS = 10;

module.exports = { ADMIN, NO_AUTH_PATHS, SALT_ROUNDS };
