module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    review_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    restaurant_id: DataTypes.INTEGER,
    body: DataTypes.TEXT,
    stars: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
  }, {
    timestamps: true,
    underscored: true,
    tableName: 'reviews',
  });

  Review.associate = (models) => {
    Review.belongsTo(models.Restaurant, { foreignKey: 'restaurant_id' });
    Review.belongsTo(models.User, { foreignKey: 'user_id' });
    Review.hasMany(models.Comment, { foreignKey: 'comment_id' });
  };

  return Review;
};
