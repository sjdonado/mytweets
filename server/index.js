const http = require('http');

const app = require('./src/app');
const config = require('./src/config/');
const logger = require('./src/library/logger');

const { port, hostname } = config.server;

const server = http.createServer(app);

server.listen(port, hostname, () => {
  logger.info(`Running at http://${hostname}:${port}`);
});
