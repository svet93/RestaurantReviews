const express = require('express');
const controller = require('../controllers/restaurant');

const router = express.Router();
/* POST login. */
router.get('/', controller.getRestaurants);
router.get('/detail/:id', controller.getRestaurantDetail);
router.post('/', controller.createRestaurant);
router.delete('/:id', controller.deleteRestaurant);

module.exports = router;
