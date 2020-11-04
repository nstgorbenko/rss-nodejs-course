const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config');
const { NO_AUTH_PATHS } = require('../common/const');
const { UnauthorizedError } = require('../helpers/error');

const tokenChecker = (req, res, next) => {
  if (NO_AUTH_PATHS.includes(req.path)) {
    return next();
  }

  const authHeader = req.header('Authorization');
  if (authHeader !== undefined) {
    const tokenString = req.header('Authorization');

    const [type, token] = tokenString.split(' ');

    if (type !== 'Bearer') {
      throw new UnauthorizedError('Unauthorized user');
    } else {
      jwt.verify(token, JWT_SECRET_KEY);
      return next();
    }
  }

  throw new UnauthorizedError('Unauthorized user');
};

module.exports = { tokenChecker };
