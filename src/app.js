const express = require('express');
const path = require('path');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');

const boardRouter = require('./resources/boards/board.router');
const loginRouter = require('./resources/login/login.router');
const taskRouter = require('./resources/tasks/task.router');
const userRouter = require('./resources/users/user.router');

const { requestLogger, errorLogger, logger } = require('./middleware/logger');
const { errorHandler } = require('./middleware/errorHandler');

process.on('uncaughtException', err => {
  logger.error(`500 Uncaught Exception. Message: ${err.message}`);
  const { exit } = process;
  logger.on('finish', () => exit(1));
});

process.on('unhandledRejection', err => {
  logger.error(`500 Unhandled Rejection. Message: ${err.message}`);
  const { exit } = process;
  logger.on('finish', () => exit(1));
});

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use(requestLogger);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/login', loginRouter);
app.use('/users', userRouter);
app.use('/boards', boardRouter);
boardRouter.use('/:boardId/tasks', taskRouter);

app.use(errorLogger);
app.use(errorHandler);

module.exports = app;
