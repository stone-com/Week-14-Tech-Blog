const { User } = require('../models');
// user seeds
const userdata = [
  {
    username: 'Stone',
    password: 'password',
  },
  {
    username: 'Mike',
    password: 'password',
  },
  {
    username: 'Cheng',
    password: 'password',
  },
];

const seedUser = () =>
  User.bulkCreate(userdata, {
    individualHooks: true,
    returning: true,
  });

module.exports = seedUser;
