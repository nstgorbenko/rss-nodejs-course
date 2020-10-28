const mongoose = require('mongoose');

const app = require('./app');
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
    // db.dropDatabase();
    app.listen(PORT, () =>
      logger.info(`App is running on http://localhost:${PORT}`)
    );
  }
);
