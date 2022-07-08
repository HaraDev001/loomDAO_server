const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class WalletAddress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsTo(User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'cascade',
        onUpdate: 'cascade',
        onInsert: 'cascade',
      });
    }
  }
  WalletAddress.init(
    {
      walletAddress: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'WalletAddress',
      tableName: 'wallet_addresses',
    }
  );
  return WalletAddress;
};
