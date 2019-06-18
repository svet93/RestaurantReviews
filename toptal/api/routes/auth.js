const express = require('express');
const controller = require('../controllers/auth');
const passport = require('../helpers/passport');

const router = express.Router();

router.get('/facebook', passport.authenticate('facebook', {
  scope: ['email', 'public_profile'],
  successRedirect: '/',
  failureRedirect: '/auth/facebook',
}));
router.get('/facebook/callback', passport.authenticate('facebook'), controller.socialLogin);
router.get('/google', passport.authenticate('google', {
  scope: ['email', 'profile'],
  successRedirect: '/',
  failureRedirect: '/auth/google',
}));
router.get('/google/callback', passport.authenticate('google'), controller.socialLogin);
router.post('/login', controller.login);
router.post('/signup', controller.signup);
router.get('/verify/:token', controller.verifyEmail);

module.exports = router;
