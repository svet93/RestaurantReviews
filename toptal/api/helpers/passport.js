const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { Strategy, ExtractJwt } = require('passport-jwt');
const FacebookStrategy = require('passport-facebook').Strategy;
const bcrypt = require('bcryptjs');
const Logger = require('../../utils/logger');

const {
  User,
  Sequelize: { Op },
} = require('../../data');

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Check user's credentials
passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  (async (email, password, cb) => {
    try {
      // Need to authenticate user here
      const dbUser = await User.findOne({
        where: {
          email: { [Op.eq]: email },
          active: 1,
        },
      });

      if (!dbUser) {
        return cb(null, false, { message: 'Incorrect email or password.' });
      }

      const isPasswordValid = await bcrypt.compare(password, dbUser.password());

      if (!isPasswordValid) {
        return cb(null, false, { message: 'Incorrect email or password.' });
      }

      const user = {
        email: dbUser.email,
        userId: dbUser.id,
      };

      return cb(null, user, { message: 'Logged In Successfully' });
    } catch (err) {
      Logger.error(err);
      return cb(err);
    }
  }),
));

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: 'https://tpc.ngrok.io/auth/facebook/callback',
  profileFields: ['id', 'emails', 'name'],
  passReqToCallback: true,
},
(async (req, accessToken, refreshToken, profile, done) => {
  try {
    if (!profile || !profile.emails || !profile.name) {
      throw new Error('Missing required paramters');
    }
    const user = await User.findOrCreate({
      where: { email: { [Op.eq]: profile.emails[0].value } },
      defaults: {
        first_name: profile.name.givenName,
        last_name: profile.name.familyName,
        password: Math.random().toString(36).substr(-8),
        user_type: 'regular',
      },
    });

    return done(null, {
      email: user[0].email,
      role: user[0].user_type(),
    });
  } catch (error) {
    Logger.error(error);
    return done(error);
  }
})));

// check if the user is authenticated
passport.use(new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  },
  ((jwtPayload, cb) => {
    if (jwtPayload.email) {
      return cb(null, jwtPayload);
    }

    return cb('Invalid Token');
  }),
));


// const authenticate = (req, res, next) => {
//   passport.authenticate('jwt', { session: false }, (err, user, info) => {
//     if (err) { return next(err); }
//     if (!user) { return res.sendStatus(418); }
//     req.user = user;
//     return next();
//   })(req, res, next);
// };

module.exports = passport;
