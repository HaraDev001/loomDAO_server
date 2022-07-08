module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TokenSales', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      banner: {
        type: Sequelize.STRING,
      },
      providerAddress: {
        type: Sequelize.STRING,
      },
      referrerAddress: {
        type: Sequelize.STRING,
      },
      maxSupply: {
        type: Sequelize.STRING,
      },
      start: {
        type: Sequelize.DATE,
      },
      duration: {
        // time in seconds (BIGINT to support more bytes number can be very large)
        type: Sequelize.BIGINT,
      },
      weiPrice: {
        // price in wei unit * 10^18
        type: Sequelize.BIGINT,
      },
      active: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable('TokenSales');
  },
};
