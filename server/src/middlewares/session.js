const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const { server } = require('../config');
const redisClient = require('../services/redisClient');

const sessionMiddleware = session({
  secret: server.secret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: 'auto' },
  store: new RedisStore({ client: redisClient }),
});

module.exports = sessionMiddleware;
