const errorHandler = (err, req, res, next) => {
  const { statusCode, message } = err;

  res
    .status(statusCode || 500)
    .send(statusCode ? message : 'Internal Server Error');
  next();
};

module.exports = { errorHandler };
