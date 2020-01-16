const router = require('express').Router();

const { oauthRequest, oauthCallback, disconnect } = require('./oauth');
const { connect, tweets } = require('./users');

router.get('/oauth_request', oauthRequest);
router.get('/oauth_callback', oauthCallback);

router.get('/tweets', tweets);

router.post('/connect', connect);
router.post('/disconnect', disconnect);

module.exports = router;
