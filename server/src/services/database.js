const mongoose = require('mongoose');
const config = require('../config');
const logger = require('../library/logger');

const { database } = config;

/**
 * Connect to database
 */
function connect() {
  mongoose.connect(
    database.url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
    (err) => {
      if (err) {
        logger.error('Database connection error:', err);
      }
    },
  );

  mongoose.connection.on('open', () => {
    logger.info(`${database.url} \x1b[32m%s\x1b[0m`, 'connected');
  });
}

/**
 * Disconnect from the database
 */
function disconnect() {
  mongoose.connection.close();
}

module.exports = {
  connect,
  disconnect,
};
