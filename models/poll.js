export default (sequelize, DataTypes) => {
  const Poll = sequelize.define('poll', {
    name: {
      type: DataTypes.STRING,
    },
  });

  Poll.associate = (models) => {
    // 1 to many with pollOptions
    Poll.hasMany(models.PollOption, {
      foreignKey: 'pollId',
    });
  };

  return Poll;
};
