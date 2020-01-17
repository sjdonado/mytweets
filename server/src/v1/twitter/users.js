const fetch = require('node-fetch');
const { twitterAPI } = require('../../config/index');
const { oauthHeaders } = require('../../services/oauth');

/**
 * User request wrapper
 * @param {String} url
 * @param {String} userId
 * @param {{ key: String, token: String }} token
 * @param {String} method
 * @returns {Object} response
 */
const request = async (url, token, method = 'GET') => {
  const data = {
    url,
    method,
    data: {
      oauth_token: token.key,
    },
  };

  const headers = oauthHeaders(data, token);

  const response = await fetch(url, {
    headers,
  });

  const jsonResponse = await response.json();

  if (response.status !== 200) {
    throw new Error(JSON.stringify(jsonResponse));
  }

  return jsonResponse;
};

const connect = async (req, res, next) => {
  try {
    const response = await request(
      `${twitterAPI.base}/1.1/account/verify_credentials.json`,
      req.session.token,
    );

    res.json({
      data: response,
    });
  } catch (err) {
    next(err);
  }
};

const tweets = async (req, res, next) => {
  try {
    const response = await request(
      `${twitterAPI.base}/1.1/statuses/user_timeline.json?include_rts=1&count=100`,
      req.session.token,
    );

    res.json({
      data: response,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  connect,
  tweets,
};
