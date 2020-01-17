const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const api = require('./v1');
const session = require('./middlewares/session');
const { server } = require('./config');

const app = express();

app.use(express.static(path.join(__dirname, 'static')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({
  origin: server.origin,
  credentials: true,
}));

app.use(session);

app.use('/api', api);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'static/index.html'));
});

module.exports = app;
