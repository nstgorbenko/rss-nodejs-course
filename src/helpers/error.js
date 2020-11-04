class ForbiddenError extends Error {
  constructor(message) {
    super();
    this.statusCode = 403;
    this.message = message;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super();
    this.statusCode = 404;
    this.message = message;
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super();
    this.statusCode = 401;
    this.message = message;
  }
}

module.exports = { ForbiddenError, NotFoundError, UnauthorizedError };
