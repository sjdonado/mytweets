
const { twitterAPI } = require('../../config/index');
const { oauthCustomRequest } = require('../../services/oauth');

const oauthRequest = async (req, res, next) => {
  try {
    if (!req.session.userId) {
      const response = await oauthCustomRequest({
        url: `${twitterAPI.base}/oauth/request_token`,
        method: 'POST',
        data: { oauth_callback: twitterAPI.callback },
      });

      req.session.oauthToken = response.oauth_token;
      req.session.oauthTokenSecret = response.oauth_token_secret;
    }

    res.json({
      data: {
        url: `${twitterAPI.base}/oauth/authenticate?oauth_token=${req.session.oauthToken}`,
      },
    });
  } catch (err) {
    next(err);
  }
};

const oauthCallback = async (req, res, next) => {
  try {
    if (!(req.query.oauth_token !== req.session.oauth_token)) {
      next(new Error('oauth_token and auth_verifier are required'));
    }

    if (!(req.query.oauth_token && req.query.oauth_verifier)) {
      next(new Error('oauth_token and auth_verifier are required'));
    }

    const response = await oauthCustomRequest({
      url: `${twitterAPI.base}/oauth/access_token`,
      method: 'POST',
      data: {
        oauth_token: req.query.oauth_token,
        oauth_verifier: req.query.oauth_verifier,
      },
    });

    req.session.token = {
      key: response.oauth_token,
      secret: response.oauth_token_secret,
    };
    req.session.userId = response.user_id;

    res.json({
      data: 'OK',
    });
  } catch (err) {
    next(err);
  }
};


module.exports = {
  oauthRequest,
  oauthCallback,
};
