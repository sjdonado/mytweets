module.exports = {
  server: {
    hostname: process.env.HOSTNAME,
    port: process.env.PORT,
    redisURL: process.env.REDIS_URL,
    secret: process.env.SECRET,
  },
  twitterAPI: {
    base: 'https://api.twitter.com',
    version: '1.0',
    callback: process.env.OAUTH_CALLBACK,
    consumerKey: process.env.OAUTH_CONSUMER_KEY,
    consumerSecret: process.env.OAUTH_CONSUMER_SECRET,
  },
};
