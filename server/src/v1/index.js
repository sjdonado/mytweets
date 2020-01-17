const router = require('express').Router();

const twitter = require('./twitter/routes');

router.use('/', twitter);

router.use((req, res, next) => {
  res.status(404);
  res.json({
    error: true,
    message: 'Not found',
  });
});
  
router.use((err, req, res, next) => {
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

module.exports = router;
