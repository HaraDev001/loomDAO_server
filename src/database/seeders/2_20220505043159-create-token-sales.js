/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-spread */
/* eslint-disable no-plusplus */
const { faker } = require('@faker-js/faker');
const { License, Listed, User, TokenSale, WalletAddress, UserTokenBalance } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    // loop through all of the users
    await Promise.all(
      Array.apply(null, { length: 50 }).map(async (_, i) => {
        const user = await User.findByPk(i + 1);
        if (user && user.get('role') === 'License Provider') {
          const userAddress = (await user.getWalletAddress()).walletAddress;
          const maxSupply = 100;
          const tokenSale = await user.createSale({
            title: `title ${user.get('id')}`,
            description:
              'Aliqua nostrud sit commodo velit nulla in labore laborum excepteur Lorem. Aliquip commodo esse est exercitation mollit Lorem deserunt reprehenderit incididunt aute irure et pariatur. Consectetur exercitation sint quis ad adipisicing id qui commodo proident amet quis sit deserunt. Voluptate amet nisi dolore est non duis culpa pariatur ea anim pariatur aliquip.',
            banner: faker.image.abstract(336, 280),
            providerAddress: userAddress,
            referrerAddress: faker.finance.ethereumAddress(),
            maxSupply,
            priceInHilo: 0.1,
            active: true,
            start: new Date(),
            duration: (new Date().getTime() / 1000).toFixed(0),
          });

          const license = await tokenSale.createLicense({
            tokenId: tokenSale.id,
            name: `license ${tokenSale.id}`,
            description: `Sunt deserunt occaecat ipsum non id elit pariatur. Tempor enim eiusmod adipisicing nisi sit occaecat do ex dolor cillum nostrud ullamco. Ex Lorem nisi officia ex tempor non sunt occaecat magna enim.`,
            imageCid: faker.image.abstract(500, 500),
            maxSupply,
            metadataCid: faker.internet.url(),
            creatorAddress: userAddress,
            userId: user.get('id'),
            collection: `lorem ${tokenSale.id}`,
          });

          await UserTokenBalance.create({
            balance: maxSupply,
            balanceType: 'Token Sale',
            userId: license.get('userId'),
            licenseId: license.get('id'),
          });
        }
      })
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
