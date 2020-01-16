const { Router } = require('express');

const twitter = require('./twitter/routes');

const router = Router();

router.use('/', twitter);

module.exports = router;
