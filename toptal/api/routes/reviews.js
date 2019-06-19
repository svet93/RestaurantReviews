const express = require('express');
const controller = require('../controllers/reviews');
const permissions = require('../helpers/permissions');

const router = express.Router();
/* POST login. */
router.get('/', controller.getReviews);
router.post('/:restaurantId', controller.createReview);
router.delete('/:id', permissions.checkAdmin, controller.deleteReview);

router.post('/:id/comment', controller.createComment);
router.delete('/comments/:id', permissions.checkAdmin, controller.deleteComent);

module.exports = router;
