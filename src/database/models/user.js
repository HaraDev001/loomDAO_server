const { Model } = require('sequelize');
// const { Sequelize } = require('.');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Profile, TokenSale, License, WalletAddress }) {
      // define association here
      this.hasOne(Profile, {
        foreignKey: 'userId',
        as: 'profile',
        onDelete: 'cascade',
        onInsert: 'cascade',
        onUpdate: 'cascade',
      });

      // define association here
      this.hasOne(WalletAddress, {
        foreignKey: 'userId',
        as: 'walletAddress',
        onDelete: 'cascade',
        onInsert: 'cascade',
        onUpdate: 'cascade',
      });

      this.hasMany(TokenSale, {
        foreignKey: 'userId',
        as: 'sales',
        onDelete: 'cascade',
        onInsert: 'cascade',
        onUpdate: 'cascade',
      });

      this.hasMany(License, {
        foreignKey: 'userId',
        as: 'licenses',
        onDelete: 'cascade',
        onInsert: 'cascade',
        onUpdate: 'cascade',
      });

      this.belongsToMany(License, {
        through: 'UserTokenBalance',
        foreignKey: 'userId',
        onDelete: 'cascade',
        onInsert: 'cascade',
        onUpdate: 'cascade',
      });

      this.belongsToMany(License, {
        through: 'UserListedToken',
        foreignKey: 'userId',
        onDelete: 'cascade',
        onInsert: 'cascade',
        onUpdate: 'cascade',
      });
    }
  }
  User.init(
    {
      role: {
        type: DataTypes.ENUM,
        values: ['Heirloomer', 'License Provider', 'Admin'],
        defaultValue: 'Heirloomer',
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
    }
  );
  return User;
};
