/* eslint-disable no-unused-vars */

const { Op } = require('sequelize');
const { WalletAddress, User, TokenSale, UserTokenBalance, UserListedToken, License } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    // retrieve all heirloomers
    const users = await User.findAll({ where: { role: 'Heirloomer' } });
    const usersWoLicenses = (
      await Promise.all(
        users.map(async (user) => {
          if ((await user.getLicenses()).length === 0) {
            return user;
          }
        })
      )
    ).filter((u) => u !== undefined);
    const usersWLicenses = users.filter((u) => !usersWoLicenses.includes(u));

    // list user licenses
    await Promise.all(
      usersWLicenses.map(async (user) => {
        // list license of user
        const license = (await user.getLicenses())[0];
        const balance = (
          await UserTokenBalance.findOne({
            where: { [Op.and]: [{ userId: user.get('id') }, { licenseId: license.get('id') }] },
          })
        ).get('balance');
        const toList = Math.floor(Math.random() * balance + 1);
        const listedToken = await UserListedToken.create({
          licenseId: license.get('id'),
          userId: user.get('id'),
          amount: toList,
          priceInHeli: 0.2,
        });
      })
    );
    // buy from listed licenses
    await Promise.all(
      usersWoLicenses.map(async (user) => {
        // select random license and random amount to buy
        const listedLicenses = await UserListedToken.findAll();
        const randomLicenseNumber = Math.floor(Math.random() * listedLicenses.length + 1);
        const randomLL = listedLicenses[randomLicenseNumber];
        const randomAmount = Math.floor(Math.random() * randomLL.get('amount') + 1);

        // buy license
        const soldLicense = await License.findOne({ where: { id: randomLL.get('licenseId') } });
        const boughtLicense = await user.createLicense({
          tokenSaleId: soldLicense.get('tokenSaleId'),
          tokenId: soldLicense.get('tokenId'),
          name: soldLicense.get('name'),
          description: soldLicense.get('description'),
          imageCid: soldLicense.get('imageCid'),
          maxSupply: soldLicense.get('maxSupply'),
          metadataCid: soldLicense.get('metadataCid'),
          creatorAddress: soldLicense.get('creatorAddress'),
          collection: soldLicense.get('collection'),
        });

        // update amount of listed license and balance of bought license
        const soldLicenseBalance = (
          await UserTokenBalance.findOne({
            where: { [Op.and]: [{ userId: randomLL.get('userId') }, { licenseId: randomLL.get('licenseId') }] },
          })
        ).get('balance');
        await UserTokenBalance.update(
          // update balance of sold item
          { balance: soldLicenseBalance - randomAmount },
          {
            where: { [Op.and]: [{ userId: randomLL.get('userId') }, { licenseId: randomLL.get('licenseId') }] },
          }
        );
        await UserTokenBalance.create({
          balance: randomAmount,
          balanceType: 'License',
          userId: boughtLicense.get('userId'),
          licenseId: boughtLicense.get('id'),
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
