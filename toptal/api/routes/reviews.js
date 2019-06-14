const express = require('express');
const controller = require('../controllers/reviews');

const router = express.Router();
/* POST login. */
router.get('/:restaurantId', controller.getReviews);
router.post('/:restaurantId', controller.createReview);
router.delete('/:id', controller.deleteReview);

module.exports = router;
