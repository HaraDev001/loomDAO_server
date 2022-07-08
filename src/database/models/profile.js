const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsTo(User, {
        foreignKey: 'userId',
        onDelete: 'cascade',
        onUpdate: 'cascade',
        onInsert: 'cascade',
      });
    }
  }
  Profile.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
      },
      companyName: {
        type: DataTypes.STRING,
        default: null,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Profile',
      tableName: 'profiles',
    }
  );
  return Profile;
};
