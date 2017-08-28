export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
  });

  User.associate = (models) => {
    // 1 to many with poll
    User.hasMany(models.Poll, {
      foreignKey: 'creator',
    });
  };

  return User;
};
