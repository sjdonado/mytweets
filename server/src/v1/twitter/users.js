const apiRequest = require('../../services/apiRequest');
const { twitterAPI } = require('../../config/index');

const User = require('../../models/User');

const connect = async (req, res, next) => {
  try {
    const data = await apiRequest(
      `${twitterAPI.base}/1.1/account/verify_credentials.json`,
      req.session.token,
    );

    console.log('connect data =>', data);

    const params = {
      userId: data.id,
      name: data.name,
      avatar: data.profile_image_url_https,
      banner: data.profile_banner_url,
      screenName: data.screen_name,
      description: data.description,
      location: data.location,
    };

    const user = await User.findOneAndUpdate(
      { userId: data.id },
      params,
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      },
    );

    res.json({
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

const tweets = async (req, res, next) => {
  try {
    const response = await apiRequest(
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
