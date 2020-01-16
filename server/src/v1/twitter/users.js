const fetch = require('node-fetch');
const { twitterAPI } = require('../../config/index');
const { oauthHeaders } = require('../../services/oauth');

const connect = async (req, res, next) => {
  try {
    const data = {
      url: `${twitterAPI.base}/users.show.json`,
      method: 'GET',
      data: {
        user_id: req.session.userId,
      },
    };

    const headers = oauthHeaders(data, req.session.token);

    const response = await fetch(data.url, {
      headers,
    });

    const jsonResponse = await response.json();

    if (response.status !== 200) {
      throw new Error(JSON.stringify(jsonResponse));
    }

    res.json({
      data: jsonResponse,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  connect,
};
