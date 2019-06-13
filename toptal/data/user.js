module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      get() {
        return () => this.getDataValue('password');
      },
    },
    active: { type: DataTypes.BOOLEAN, defaultValue: 1 },
    created: { type: DataTypes.DATE, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') },
    updated: { type: DataTypes.DATE, defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') },
  }, {
    timestamps: false,
    tableName: 'users',
  });

  // User.associate = (models) => {
  //   User.hasMany(models.UserEmail, { foreignKey: 'partner_id' });
  // };

  return User;
};
