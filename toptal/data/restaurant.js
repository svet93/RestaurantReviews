module.exports = (sequelize, DataTypes) => {
  const Restaurant = sequelize.define('Restaurant', {
    restaurant_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    active: { type: DataTypes.BOOLEAN, defaultValue: 1 },
    created: { type: DataTypes.DATE, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') },
    updated: { type: DataTypes.DATE, defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') },
  }, {
    timestamps: false,
    tableName: 'restaurants',
  });

  Restaurant.associate = (models) => {
    Restaurant.belongsTo(models.User, { foreignKey: 'user_id' });
    Restaurant.hasMany(models.Review, { foreignKey: 'restaurant_id' });
  };

  return Restaurant;
};
