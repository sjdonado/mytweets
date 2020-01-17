const fetch = require('node-fetch');
const { oauthHeaders } = require('./oauth');


/**
 * Api request wrapper
 * @param {String} url
 * @param {String} userId
 * @param {{ key: String, token: String }} token
 * @param {String} method
 * @returns {Object} response
 */
const apiRequest = async (url, token, method = 'GET') => {
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

module.exports = apiRequest;
