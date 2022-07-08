module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Licenses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      tokenId: {
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      imageCid: {
        type: Sequelize.STRING,
        unique: true,
      },
      description: {
        type: Sequelize.INTEGER,
      },
      metadataCid: {
        type: Sequelize.STRING,
        unique: true,
      },
      maxSupply: {
        type: Sequelize.INTEGER,
      },
      creatorAddress: {
        type: Sequelize.STRING,
      },
      collection: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Licenses');
  },
};
