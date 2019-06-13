const express = require('express');
const controller = require('../controllers/restaurant');

const router = express.Router();
/* POST login. */
router.get('/', controller.getRestaurants);

module.exports = router;
