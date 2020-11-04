const mongoose = require('mongoose');

const { ADMIN } = require('./common/const');
const app = require('./app');
const { create: createAdmin } = require('./resources/users/user.service');
const { logger } = require('./middleware/logger');
const { MONGO_CONNECTION_STRING, PORT } = require('./common/config');

mongoose.connect(MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', () => logger.error('MongoDB connection error')).once(
  'open',
  () => {
    logger.info('Successfully connect to MongoDB');
    db.dropDatabase();
    createAdmin(ADMIN);
    app.listen(PORT, () =>
      logger.info(`App is running on http://localhost:${PORT}`)
    );
  }
);
