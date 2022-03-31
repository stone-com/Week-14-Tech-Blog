const sequelize = require('../config/config');
const seedUser = require('./userData');
const seedPost = require('./postData');

// function to seed all data, run other seed files all in one spot
const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();
  console.log('USERS SEEDED');
  await seedPost();
  console.log('POSTS SEEDED');
  process.exit(0);
};

seedAll();
