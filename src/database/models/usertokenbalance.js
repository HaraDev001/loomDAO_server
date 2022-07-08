/* eslint-disable no-unused-vars */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserTokenBalance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  UserTokenBalance.init(
    {
      balance: {
        type: DataTypes.INTEGER,
      },
      balanceType: {
        type: DataTypes.ENUM,
        values: ['Token Sale', 'License'],
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'UserTokenBalance',
      tableName: 'user_token_balances',
    }
  );
  return UserTokenBalance;
};
