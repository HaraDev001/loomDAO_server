/* eslint-disable no-unused-vars */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserListedToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  UserListedToken.init(
    {
      priceInHeli: {
        type: DataTypes.FLOAT,
      },
      amount: {
        type: DataTypes.BIGINT,
      },
      sold: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'UserListedToken',
      tableName: 'user_listed_tokens',
    }
  );
  return UserListedToken;
};
