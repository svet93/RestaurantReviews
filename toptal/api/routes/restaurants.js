const express = require('express');
const controller = require('../controllers/restaurant');
const permissions = require('../helpers/permissions');

const router = express.Router();
/* POST login. */
router.get('/', controller.getRestaurants);
router.get('/detail/:id', controller.getRestaurantDetail);
router.post('/', permissions.checkAdmin, controller.createRestaurant);
router.delete('/:id', permissions.checkAdmin, controller.deleteRestaurant);

module.exports = router;
