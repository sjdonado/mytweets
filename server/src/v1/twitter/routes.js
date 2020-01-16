const router = require('express').Router();

const { oauthRequest, oauthCallback, connect } = require('./controller');

router.get('/oauth_request', oauthRequest);
router.get('/oauth_callback', oauthCallback);
router.post('/connect', connect);

module.exports = router;
