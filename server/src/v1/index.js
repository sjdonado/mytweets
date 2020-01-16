const router = require('express').Router();

const twitter = require('./twitter/routes');

router.use('/', twitter);

module.exports = router;
