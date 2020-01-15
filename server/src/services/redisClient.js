const redis = require('redis');
const { server } = require('../config');

const redisClient = redis.createClient(server.redisURL);

redisClient.on('error', (err) => {
  console.log('Redis error: ', err);
});

module.exports = redisClient;
