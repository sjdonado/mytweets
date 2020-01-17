const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const { server } = require('../config');
const redisClient = require('../services/redisClient');

const options = {
  secret: server.secret,
  resave: false,
  saveUninitialized: true,
  rolling: true,
  cookie: {
    secure: 'auto',
    httpOnly: false,
    maxAge: 24 * 60 * 60 * 1000,
  },
  store: new RedisStore({ client: redisClient }),
};

if (process.env.NODE_ENV === 'production') {
  Object.assign(options, {
    cookie: {
      ...options.cookie,
      sameSite: true,
    },
  });
}

const sessionMiddleware = session(options);

module.exports = sessionMiddleware;
