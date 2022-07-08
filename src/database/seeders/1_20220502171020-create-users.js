/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/no-extraneous-dependencies
const { faker } = require('@faker-js/faker');
const { User } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    const roles = ['Heirloomer', 'License Provider', 'Admin'];
    await Promise.all(
      // eslint-disable-next-line prefer-spread
      Array.apply(null, { length: 50 }).map(async (_, i) => {
        const user = await User.create({
          role: roles[i % roles.length],
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();
        await user.createProfile({
          firstName,
          lastName,
          companyName: faker.company.companyName(),
          email: faker.internet.email(firstName, lastName),
          phone: faker.phone.phoneNumber(),
          username: faker.internet.userName(firstName, lastName),
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        await user.createWalletAddress({
          walletAddress: faker.finance.ethereumAddress(),
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      })
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('People', null, {});
  },
};
