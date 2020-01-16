const fetch = require('node-fetch');

const { oauth } = require('../../config/index');
const { oauthHeaders, parseToObject } = require('../../services/oauth');

const oauthRequest = async (req, res, next) => {
  try {
    if (!req.session.oauthToken) {
      const data = {
        url: `${oauth.base}/request_token`,
        method: 'POST',
        data: { oauth_callback: oauth.callback },
      };

      const response = await fetch(data.url, {
        method: data.method,
        headers: oauthHeaders(data),
      });

      const responseObject = await parseToObject(response);
      req.session.oauthToken = responseObject.oauth_token;
      req.session.oauthTokenSecret = responseObject.oauth_token_secret;
    }

    res.json({
      data: {
        url: `${oauth.base}/authenticate?oauth_token=${req.session.oauthToken}`,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  oauthRequest,
};
