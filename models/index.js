import Sequelize from 'sequelize';

const sequelize = new Sequelize('poll', 'test_graphql_admin', 'iamapassword', {
  host: 'localhost',
  dialect: 'postgres',
});

const db = {
  User: sequelize.import('./user'),
  Poll: sequelize.import('./poll'),
  PollOption: sequelize.import('./pollOption'),
};

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
// db.Sequelize = Sequelize;

export default db;
