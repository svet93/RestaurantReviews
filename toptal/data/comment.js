module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    comment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    review_id: DataTypes.INTEGER,
    body: DataTypes.TEXT,
    user_id: DataTypes.INTEGER,
  }, {
    timestamps: true,
    underscored: true,
    tableName: 'comments',
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.Review, { foreignKey: 'review_id' });
    Comment.belongsTo(models.User, { foreignKey: 'user_id' });
  };

  return Comment;
};
