const express = require('express');
const { changePassword, refreshToken } = require('../controllers/account');

const router = express.Router();
/* POST login. */
router.post('/changePassword', changePassword);
router.post('/refreshToken', refreshToken);

module.exports = router;
