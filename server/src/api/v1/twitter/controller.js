const fetch = require('node-fetch');

const { oauth } = require('../../../config/index');

const oauthRequest = async (req, res, next) => {
  try {
    const data = await fetch(`${oauth.base}/request_token`, {
      method: 'POST',
      body: `oauth_callback=${oauth.callback}`,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  oauthRequest,
};
