const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss Z' }),
    format.align(),
    format.printf(data => `${data.timestamp}: ${data.message}`)
  ),
  transports: [
    new transports.File({
      filename: `${__dirname}/../log/info.log`,
      level: 'info',
      colorize: true
    }),
    new transports.File({
      filename: `${__dirname}/../log/error.log`,
      level: 'error',
      colorize: true
    })
  ],

  exitOnError: false
});

const requestLogger = (req, res, next) => {
  const { method, protocol, hostname, socket, originalUrl, query, body } = req;

  logger.info(
    `${method} ${protocol}://${hostname}:${
      socket.localPort
    }${originalUrl} query:${JSON.stringify(query)} body:${JSON.stringify(body)}`
  );
  next();
};

const errorLogger = (err, req, res, next) => {
  const { statusCode, message } = err;

  logger.error(
    `${statusCode || 500} ${statusCode ? message : 'Internal Server Error'}`
  );
  next(err);
};

module.exports = { logger, requestLogger, errorLogger };
