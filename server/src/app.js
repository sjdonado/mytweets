const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const { server } = require('./config');
const redisClient = require('./services/redisClient');

const api = require('./v1');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

const sessionConfig = {
  secret: server.secret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: 'auto' },
  store: new RedisStore({ client: redisClient }),
};

if (process.env.NODE_ENV === 'production') {
  Object.assign(sessionConfig, {
  });
}

app.use(session(sessionConfig));

app.use('/', api);

app.use((req, res, next) => {
  res.status(404);
  res.json({
    error: true,
    message: 'Not found',
  });
});

app.use((err, req, res, next) => {
  const {
    statusCode = 500, message,
  } = err;

  console.error(err);

  res.status(statusCode);
  res.json({
    error: true,
    message,
  });
});

module.exports = app;
