module.exports = {
  server: {
    hostname: process.env.HOSTNAME,
    port: process.env.PORT,
    origin: process.env.ORIGIN,
    secret: process.env.SECRET,
    redisURL: process.env.REDIS_URL,
  },
  database: {
    url: process.env.MONGO_URL,
  },
  twitterAPI: {
    base: 'https://api.twitter.com',
    version: '1.0',
    callback: process.env.OAUTH_CALLBACK,
    consumerKey: process.env.OAUTH_CONSUMER_KEY,
    consumerSecret: process.env.OAUTH_CONSUMER_SECRET,
  },
};
