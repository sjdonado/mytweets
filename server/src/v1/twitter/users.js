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
const request = async (url, userId, token, method = 'GET') => {
  const data = {
    url,
    method,
    data: {
      user_id: userId,
    },
  };

  const headers = oauthHeaders(data, token);

  const response = await fetch(data.url, {
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
      `${twitterAPI.base}/1.1/users.show.json`,
      req.session.userId,
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
      `${twitterAPI.base}/1.1/statuses/home_timeline.json`,
      req.session.userId,
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
