const passport = require('passport');
const fs = require('fs');
const { promisify } = require('util');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Handlebars = require('handlebars');
const Logger = require('../../utils/logger');
const {
  User,
  Sequelize: { Op },
} = require('../../data');
const sg = require('../helpers/sendgrid');

const readFileAsync = promisify(fs.readFile);

exports.login = async (req, res) => {
  try {
    return passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err || !user) {
        return res.status(401).send(err);
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
  const {
    email,
    firstName,
    lastName,
    password,
  } = req.body;
  try {
    const existing = await User.findOne({
      where: { email: { [Op.eq]: email } },
    });
    if (existing) {
      return res.status(400).send('User exists');
    }

    const hashedPass = await bcrypt.hash(password, 10);
    const user = await User.create({
      first_name: firstName,
      last_name: lastName,
      email,
      password: hashedPass,
      user_type: 'regular',
    });

    const userTokenized = jwt.sign(
      { email: user.email, userId: user.user_id },
      process.env.JWT_EMAIL,
    );

    const templateFile = await readFileAsync(path.resolve(process.cwd(), 'api/email_templates', 'verify.hbs'));
    const compiledTemplate = Handlebars.compile(templateFile.toString());

    await sg.sendSimpleEmail(email, 'Thanks for joining!', compiledTemplate({
      verificationLink: `${process.env.SERVER_URL}/auth/verify/${encodeURIComponent(userTokenized)}`,
    }));

    return res.send('OK');
  } catch (e) {
    Logger.error(e);
  }
  return res.status(500).send('Server error occured, try again later');
};

exports.verifyEmail = async (req, res) => {
  const {
    token,
  } = req.params;
  const decodedToken = decodeURIComponent(token);

  try {
    const user = await jwt.verify(decodedToken, process.env.JWT_EMAIL);
    const dbUser = await User.findOne({
      where: {
        email: { [Op.eq]: user.email },
        user_id: { [Op.eq]: user.userId },
      },
    });

    if (!dbUser) {
      return res.status(404).send('Not Found');
    }

    dbUser.verified = true;
    await dbUser.save();

    const signInToken = jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: '4h',
    });

    return res.redirect(`${process.env.CLIENT_URL}/signin/${signInToken}`);
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

  return res.redirect(`${process.env.CLIENT_URL}/signin/${token}`);
};
