const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const { server } = require('./config');
const redisClient = require('./services/redisClient');


const apiV1 = require('./api/v1');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

const sessionConfig = {
  secret: server.secret,
  resave: false,
  saveUninitialized: true,
  store: new RedisStore({ client: redisClient }),
};

if (process.env.NODE_ENV === 'production') {
  Object.assign(sessionConfig, {
    cookie: { secure: true },
  });
}

app.use(session(sessionConfig));

app.use('/v1', apiV1);

app.use((req, res) => {
  res.status(404);
  res.json({
    error: true,
    message: 'Not found',
  });
});

app.use((err, req, res) => {
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
