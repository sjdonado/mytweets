const crypto = require('crypto');
const OAuth = require('oauth-1.0a');

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

const parseToObject = async (response) => {
  const textResponse = await response.text();
  return Object.fromEntries(new URLSearchParams(textResponse));
};

// const percentEncode = (str) => encodeURIComponent(str)
//   .replace(/\!/g, '%21')
//   .replace(/\*/g, '%2A')
//   .replace(/\'/g, '%27')
//   .replace(/\(/g, '%28')
//   .replace(/\)/g, '%29');

// const getAuthorizationHeader = () => {
//   const authNonce = crypto.randomBytes(16).toString('hex');
//   const timestamp = parseInt(new Date().getTime() / 1000, 10);

//   const baseParams = [
//     'oauth_signature_method="HMAC-SHA1"',
//     `oauth_version="${oauth.version}"`,
//     `oauth_consumer_key="${oauth.consumerKey}"`,
//     `oauth_nonce="${authNonce}"`,
//     `oauth_timestamp="${timestamp}"`,
//   ];
//   baseParams.sort();

//   const signingKey = `${oauth.consumerKey}&${oauth.consumerSecret}`;
//   const signatureParams = `POST&${percentEncode(`${oauth.base}/request_token`)}&${percentEncode(baseParams.join('&').replace('"', ''))}`;

//   const oauthSignature = crypto.createHmac('sha1', signingKey)
//     .update(signatureParams)
//     .digest('base64');

//   baseParams.push(`oauth_callback="${percentEncode(oauth.callback)}"`);
//   baseParams.push(`oauth_signature="${oauthSignature}"`);
//   baseParams.sort();

//   return `OAuth ${baseParams.join(', ')}`;
// };

module.exports = {
  oauthHeaders,
  parseToObject,
};
