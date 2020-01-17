const router = require('express').Router();
const logger = require('../library/logger');

const twitter = require('./twitter/routes');

router.use('/', twitter);

// eslint-disable-next-line no-unused-vars
router.use((req, res, next) => {
  res.status(404);
  res.json({
    error: true,
    message: 'Not found',
  });
});

// eslint-disable-next-line no-unused-vars
router.use((err, req, res, next) => {
  const {
    statusCode = 500, message,
  } = err;

  logger.error(err);

  res.status(statusCode);
  res.json({
    error: true,
    message,
  });
});

module.exports = router;
