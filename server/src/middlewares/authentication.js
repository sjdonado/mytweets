const authentication = (req, res, next) => {
  if (!req.session.token) {
    const error = new Error('Session token not found');
    error.statusCode = 401;
    next(error);
  }
  next();
};

module.exports = authentication;
