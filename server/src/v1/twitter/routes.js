const router = require('express').Router();

const { oauthRequest, oauthCallback } = require('./oauth');
const { connect } = require('./users');

router.get('/oauth_request', oauthRequest);
router.get('/oauth_callback', oauthCallback);

router.post('/connect', connect);

module.exports = router;
