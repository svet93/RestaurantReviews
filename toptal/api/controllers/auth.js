const passport = require('passport');
const jwt = require('jsonwebtoken');
const Logger = require('../../utils/logger');

exports.login = async (req, res) => {
  try {
    return passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err || !user) {
        return res.status(401).json({
          message: info ? info.message : 'Something is not right',
        });
      }

      const token = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: '4h',
      });

      return res.json({ token, user });
    })(req, res);
  } catch (e) {
    Logger.error(e);
  }
  return res.status(500).send('Server error occured, try again later');
};

exports.signup = async (req, res) => {
  try {
    return passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err || !user) {
        return res.status(401).json({
          message: info ? info.message : 'Something is not right',
        });
      }

      const token = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: '4h',
      });

      return res.json({ token, user });
    })(req, res);
  } catch (e) {
    Logger.error(e);
  }
  return res.status(500).send('Server error occured, try again later');
};

exports.socialLogin = (req, res) => {
  const { user } = req;
  if (!user) {
    return res.status(401).send('Something is not right');
  }

  const token = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: '4h',
  });

  return res.redirect(`localhost:3000/login/${token}`);
};
