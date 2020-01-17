const router = require('express').Router();

const { oauthRequest, oauthCallback, disconnect } = require('./oauth');
const { connect, tweets } = require('./users');
const authentication = require('../../middlewares/authentication');

router.get('/oauth_request', oauthRequest);
router.get('/oauth_callback', oauthCallback);

router.get('/tweets', authentication, tweets);
router.post('/connect', authentication, connect);
router.post('/disconnect', authentication, disconnect);

module.exports = router;
