const { Model } = require('sequelize');
const { tokenTypes } = require('../../config/tokens');

module.exports = (sequelize, DataTypes) => {
  class Jwtoken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  Jwtoken.init(
    {
      token: {
        type: DataTypes.INTEGER,
      },
      type: {
        type: DataTypes.ENUM(tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD, tokenTypes.VERIFY_EMAIL),
        allowNull: false,
      },
      expires: {
        type: DataTypes.DATE,
      },
      blacklisted: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: 'Jwtoken',
      indexes: [{ unique: true, fields: ['token'] }],
    }
  );
  return Jwtoken;
};
