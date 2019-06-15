const express = require('express');
const controller = require('../controllers/auth');
const passport = require('../helpers/passport');

const router = express.Router();

router.get('/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));
router.get('/facebook/callback', passport.authenticate('facebook'), controller.socialLogin);
router.post('/login', controller.login);
router.post('/signup', controller.signup);

module.exports = router;
