const errorHandler = (err, req, res) => {
  const { statusCode, message } = err;

  res
    .status(statusCode || 500)
    .send(statusCode ? message : 'Internal Server Error');
};

module.exports = { errorHandler };
