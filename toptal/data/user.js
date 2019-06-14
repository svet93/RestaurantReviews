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
    user_type: {
      type: DataTypes.STRING,
      get() {
        return () => this.getDataValue('user_type');
      },
    },
    active: { type: DataTypes.BOOLEAN, defaultValue: 1 },
  }, {
    timestamps: true,
    underscored: true,
    tableName: 'users',
  });

  // User.associate = (models) => {
  //   User.hasMany(models.UserEmail, { foreignKey: 'partner_id' });
  // };

  return User;
};
