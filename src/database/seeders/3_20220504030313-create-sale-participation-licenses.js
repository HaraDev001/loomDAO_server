/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-shadow */
/* eslint-disable prefer-spread */

const { WalletAddress, User, TokenSale, UserTokenBalance } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    const [, , , , , , , ...users] = await User.findAll({ where: { role: 'Heirloomer' } });
    const tokenSales = await TokenSale.findAll();
    await Promise.all(
      users.map(async (user) => {
        const random = Math.floor(Math.random() * tokenSales.length + 1);
        const randomTokenSale = tokenSales[random % tokenSales.length];
        const randomLicense = await randomTokenSale.getLicense();

        // simulate sale participation
        const license = await user.createLicense({
          tokenSaleId: randomLicense.get('id'),
          tokenId: randomLicense.get('tokenId'),
          name: randomLicense.get('name'),
          description: randomLicense.get('description'),
          imageCid: randomLicense.get('imageCid'),
          maxSupply: randomLicense.get('maxSupply'),
          metadataCid: randomLicense.get('metadataCid'),
          creatorAddress: randomLicense.get('creatorAddress'),
          collection: randomLicense.get('collection'),
        });

        const providerAddress = await WalletAddress.findOne({
          where: { walletAddress: randomLicense.get('creatorAddress') },
        });
        const provider = await UserTokenBalance.findOne({ where: { userId: providerAddress.get('userId') } });
        const toBuy = Math.floor(Math.random() * 100 + 1);

        // update balance
        const newProviderBalance = provider.get('balance') - toBuy;
        await UserTokenBalance.update(
          { balance: newProviderBalance },
          {
            where: { userId: provider.get('userId') },
          }
        );

        // create new record for user balance
        await UserTokenBalance.create({
          balance: toBuy,
          balanceType: 'License',
          userId: license.get('userId'),
          licenseId: license.get('id'),
        });
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
