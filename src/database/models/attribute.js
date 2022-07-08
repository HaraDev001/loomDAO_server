const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Attribute extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ License }) {
      // define association here
      this.belongsTo(License, {
        foreignKey: 'licenseId',
        onDelete: 'cascade',
        onUpdate: 'cascade',
        onInsert: 'cascade',
      });
    }
  }
  Attribute.init(
    {
      property: {
        type: DataTypes.STRING,
      },
      value: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Attribute',
      tableName: 'attributes',
    }
  );
  return Attribute;
};
