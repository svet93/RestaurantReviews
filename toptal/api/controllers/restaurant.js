const {
  Restaurant,
} = require('../../data');

const getRestaurants = async (req, res) => {
  const restaurants = await Restaurant.findAll({
    where: { active: 1 },
  });
  return res.json(restaurants.map(r => ({ id: r.restaurant_id, name: r.name })));
};

module.exports = {
  getRestaurants,
};
