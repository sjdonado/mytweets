const router = require('express').Router();

const { oauthRequest } = require('./controller');

router.get('/oauth_request', oauthRequest);

module.exports = router;
