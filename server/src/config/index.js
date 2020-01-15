module.exports = {
  server: {
    hostname: process.env.HOST,
    port: process.env.PORT,
  },
  oauth: {
    base: 'https://api.twitter.com/oauth/',
    callback: process.env.OAUTH_CALLBACK,
  },
};
