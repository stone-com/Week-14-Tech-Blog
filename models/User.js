const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/config');

class User extends Model {
  // check for correct password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    //   use sequelize hooks + bcrypt to hash the passwords when creating or updating a user.
    hooks: {
      beforeCreate: async (userData) => {
        //   before creating new user, hash the password
        userData.password = await bcrypt.hash(userData.password, 10);
        return userData;
      },
      beforeUpdate: async (userData) => {
        //   before updating user, hash the passwrd
        userData.password = await bcrypt.hash(userData.password, 10);
        return userData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
