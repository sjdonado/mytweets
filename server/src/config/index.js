module.exports = {
  server: {
    hostname: process.env.HOSTNAME,
    port: process.env.PORT,
    redisURL: process.env.REDIS_URL,
    secret: process.env.SECRET,
  },
  oauth: {
    base: 'https://api.twitter.com/oauth/',
    callback: process.env.OAUTH_CALLBACK,
  },
};
