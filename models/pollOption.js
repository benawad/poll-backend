export default (sequelize, DataTypes) => {
  const PollOption = sequelize.define('poll_option', {
    text: {
      type: DataTypes.STRING,
    },
    votes: {
      type: DataTypes.INTEGER,
    },
  });

  return PollOption;
};
