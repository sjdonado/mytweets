const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const api = require('./v1');
const session = require('./middlewares/session');
const { server } = require('./config');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({
  origin: server.origin,
  credentials: true,
}));

app.use(session);

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
