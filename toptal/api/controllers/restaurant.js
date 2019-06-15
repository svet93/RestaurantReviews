const {
  Restaurant,
  Sequelize: { Op },
} = require('../../data');
const Logger = require('../../utils/logger');

exports.getRestaurants = async (req, res) => {
  const restaurants = await Restaurant.findAll({
    where: { active: 1 },
  });
  return res.json(restaurants.map(r => ({ id: r.restaurant_id, name: r.name })));
};

exports.createRestaurant = async (req, res) => {
  const {
    name,
    userId,
  } = req.body;

  try {
    const restaurant = await Restaurant.create({
      name,
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
