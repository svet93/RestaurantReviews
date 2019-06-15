const express = require('express');
const controller = require('../controllers/reviews');

const router = express.Router();
/* POST login. */
router.get('/', controller.getReviews);
router.post('/:restaurantId', controller.createReview);
router.delete('/:id', controller.deleteReview);

router.post('/:id/comment', controller.createComment);
router.delete('/comments/:id', controller.deleteComent);

module.exports = router;
