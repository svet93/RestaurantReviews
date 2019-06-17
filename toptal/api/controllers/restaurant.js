const {
  Comment,
  Review,
  Restaurant,
  Sequelize: { Op },
} = require('../../data');
const Logger = require('../../utils/logger');

exports.getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll({
      where: { active: 1 },
      include: [Review],
    });

    return res.json(restaurants.map(r => ({
      id: r.restaurant_id,
      name: r.name,
      description: r.description,
      imageUrl: r.image_url,
      rating: r.Reviews.length
        ? (r.Reviews.reduce((accu, curr) => (accu + curr.stars), 0.0)) / r.Reviews.length
        : -1,
    })));
  } catch (error) {
    Logger.error(error);
  }
  return res.status(500).send('Server Error');
};

exports.getRestaurantDetail = async (req, res) => {
  const {
    id,
  } = req.params;
  try {
    const highestReview = await Review.findOne({
      where: { restaurant_id: id },
      order: [['stars', 'DESC']],
    });
    const lowestReview = await Review.findOne({
      where: { restaurant_id: id },
      order: ['stars'],
    });
    const mostRecent = await Review.findAll({
      where: { restaurant_id: id },
      include: [Comment],
      order: [['createdAt', 'DESC']],
    });
    return res.json({
      highestReview,
      lowestReview,
      mostRecent,
    });
  } catch (error) {
    Logger.error(error);
  }
  return res.status(500).send('Server Error');
};

exports.createRestaurant = async (req, res) => {
  const {
    name,
    description,
    imageUrl,
    userId,
  } = req.body;

  try {
    const restaurant = await Restaurant.create({
      name,
      description,
      image_url: imageUrl,
      user_id: userId,
      active: 1,
    });

    return res.status(201).json(restaurant);
  } catch (error) {
    Logger.error(error);
  }
  return res.status(500).send('Server Error');
};

exports.deleteRestaurant = async (req, res) => {
  const {
    id,
  } = req.params;

  try {
    const restaurant = await Restaurant.findOne({
      where: { restaurant_id: { [Op.eq]: id } },
    });

    if (!restaurant) {
      return res.status(404).send('Restaurant not found');
    }

    await restaurant.destroy();
    return res.status(200).send('Restaurant deleted');
  } catch (error) {
    Logger.error(error);
  }
  return res.status(500).send('Server Error');
};
