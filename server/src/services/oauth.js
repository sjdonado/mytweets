const crypto = require('crypto');
const OAuth = require('oauth-1.0a');
const fetch = require('node-fetch');

const { oauth } = require('../config');

const oauthHeaders = (data, token = null) => {
  const oauthObject = OAuth({
    consumer: {
      key: oauth.consumerKey,
      secret: oauth.consumerSecret,
    },
    signature_method: 'HMAC-SHA1',
    hash_function(baseString, key) {
      return crypto
        .createHmac('sha1', key)
        .update(baseString)
        .digest('base64');
    },
  });
  return oauthObject.toHeader(oauthObject.authorize(data, token));
};

const oauthCustomRequest = async (data, token) => {
  const headers = oauthHeaders(data, token);

  const response = await fetch(data.url, {
    method: data.method,
    data: data.data ? data.data : null,
    headers,
  });

  const textResponse = await response.text();

  if (response.status !== 200) {
    throw new Error(textResponse);
  }

  return Object.fromEntries(new URLSearchParams(textResponse));
};

module.exports = {
  oauthHeaders,
  oauthCustomRequest,
};
