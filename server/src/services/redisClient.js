const redis = require('redis');
const { server } = require('../config');
const logger = require('../library/logger');

const redisClient = redis.createClient(server.redisURL);

redisClient.on('error', (err) => {
  logger.error('Redis error: ', err);
});

module.exports = redisClient;
