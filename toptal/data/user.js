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
    user_type: DataTypes.STRING,
    verified: { type: DataTypes.BOOLEAN, defaultValue: 0 },
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
