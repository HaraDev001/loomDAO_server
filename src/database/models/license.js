const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class License extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Attribute, User, TokenSale }) {
      // define association here
      this.hasMany(Attribute, {
        foreignKey: 'licenseId',
        as: 'attributes',
        onDelete: 'cascade',
        onInsert: 'cascade',
        onUpdate: 'cascade',
      });

      this.belongsTo(User, {
        foreignKey: 'userId',
        as: 'users',
        onDelete: 'cascade',
        onInsert: 'cascade',
        onUpdate: 'cascade',
      });

      this.belongsTo(TokenSale, {
        foreignKey: 'tokenSaleId',
        as: 'sale',
        onDelete: 'cascade',
        onInsert: 'cascade',
        onUpdate: 'cascade',
      });

      this.belongsToMany(User, {
        through: 'UserListedToken',
        foreignKey: 'licenseId',
        as: 'listedToken',
        onDelete: 'cascade',
        onInsert: 'cascade',
        onUpdate: 'cascade',
      });

      this.belongsToMany(User, {
        through: 'UserTokenBalance',
        foreignKey: 'licenseId',
        onDelete: 'cascade',
        onInsert: 'cascade',
        onUpdate: 'cascade',
      });
    }
  }
  License.init(
    {
      tokenId: {
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING(1234),
      },
      imageCid: {
        type: DataTypes.STRING,
      },
      maxSupply: {
        type: DataTypes.INTEGER,
      },
      creatorAddress: {
        type: DataTypes.STRING,
      },
      metadataCid: {
        type: DataTypes.STRING,
      },
      collection: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'License',
      tableName: 'licenses',
    }
  );
  return License;
};
