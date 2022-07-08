module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Jwtokens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      token: {
        type: Sequelize.INTEGER,
      },
      type: {
        type: Sequelize.ENUM,
      },
      expires: {
        type: Sequelize.DATE,
      },
      blacklisted: {
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
    await queryInterface.dropTable('Jwtokens');
  },
};
