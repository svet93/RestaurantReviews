const {
  Comment,
  Review,
  User,
  Sequelize: { Op },
} = require('../../data');
const Logger = require('../../utils/logger');

exports.getReviews = async (req, res) => {
  const {
    restaurantId,
  } = req.query;

  const where = restaurantId ? { restaurant_id: { [Op.eq]: restaurantId } } : {};

  try {
    const reviews = await Review.findAll({
      where,
      include: [
        User,
        { model: Comment, include: [User] },
      ],
    });
    return res.json(reviews);
  } catch (error) {
    Logger.error(error);
  }
  return res.status(500).send('Server Error');
};

exports.createReview = async (req, res) => {
  const {
    stars,
    userId,
    body,
  } = req.body;

  const {
    restaurantId,
  } = req.params;

  try {
    const review = await Review.create({
      restaurant_id: restaurantId,
      body,
      stars,
      user_id: userId || req.user.userId,
    });

    return res.status(201).json(review);
  } catch (error) {
    Logger.error(error);
  }
  return res.status(500).send('Server Error');
};

exports.deleteReview = async (req, res) => {
  const {
    id,
  } = req.params;

  try {
    const review = await Review.findOne({
      where: { review_id: { [Op.eq]: id } },
    });

    if (!review) {
      return res.status(404).send('Review not found');
    }

    await review.destroy();
    return res.status(200).send('Review deleted');
  } catch (error) {
    Logger.error(error);
  }
  return res.status(500).send('Server Error');
};

exports.createComment = async (req, res) => {
  const {
    userId,
    body,
  } = req.body;

  const {
    id,
  } = req.params;

  try {
    const comment = await Comment.create({
      review_id: id,
      body,
      user_id: userId,
    });

    return res.status(201).json(comment);
  } catch (error) {
    Logger.error(error);
  }
  return res.status(500).send('Server Error');
};

exports.deleteComent = async (req, res) => {
  const {
    id,
  } = req.params;

  try {
    const comment = await Comment.findOne({
      where: { review_id: { [Op.eq]: id } },
    });

    if (!comment) {
      return res.status(404).send('Comment not found');
    }

    await comment.destroy();
    return res.status(200).send('Comment deleted');
  } catch (error) {
    Logger.error(error);
  }
  return res.status(500).send('Server Error');
};
