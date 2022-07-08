const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TokenSale extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, License }) {
      // define association here
      this.belongsTo(User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'cascade',
        onInsert: 'cascade',
        onUpdate: 'cascade',
      });

      this.hasOne(License, {
        foreignKey: 'tokenSaleId',
        as: 'license',
        onDelete: 'cascade',
        onInsert: 'cascade',
        onUpdate: 'cascade',
      });
    }
  }
  TokenSale.init(
    {
      title: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING(1234),
      },
      banner: {
        type: DataTypes.STRING,
      },
      providerAddress: {
        type: DataTypes.STRING,
      },
      referrerAddress: {
        type: DataTypes.STRING,
      },
      maxSupply: {
        type: DataTypes.STRING,
      },
      start: {
        type: DataTypes.DATE,
      },
      duration: {
        // time in seconds (BIGINT to support more bytes number can be very large)
        type: DataTypes.BIGINT,
      },
      priceInHilo: {
        type: DataTypes.FLOAT,
      },
      active: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: 'TokenSale',
      tableName: 'token_sales',
    }
  );
  return TokenSale;
};
