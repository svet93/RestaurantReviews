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
    created: { type: DataTypes.DATE, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') },
    updated: { type: DataTypes.DATE, defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') },
  }, {
    timestamps: false,
    tableName: 'comments',
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.Review, { foreignKey: 'review_id' });
    Comment.belongsTo(models.User, { foreignKey: 'user_id' });
  };

  return Comment;
};
