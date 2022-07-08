/* eslint-disable no-return-await */
/* eslint-disable no-return-assign */
/* eslint-disable prefer-spread */
const { Op } = require('sequelize');
const db = require('../../database/models');
const { User, sequelize, Profile, License, WalletAddress, TokenSale } = require('../../database/models');
const pick = require('../../utils/pick');

const UserRepository = {
  async create(userData) {
    const { profile, walletAddress, role } = userData;
    const t = await sequelize.transaction();
    try {
      const user = await User.create({ role }, { transaction: t });
      await user.createProfile({ ...profile }, { transaction: t });
      await user.createWalletAddress({ walletAddress: walletAddress.toLowerCase() }, { transaction: t });
      await t.commit();
      return user;
    } catch (e) {
      await t.rollback();
      throw e;
    }
  },
  async update(userId, updateData) {
    const t = await sequelize.transaction();
    // extract update info from updateData
    const [userData, profileData, walletData] = [User, Profile, WalletAddress].map((a) => {
      if (Object.keys(pick(a.rawAttributes, Object.keys(updateData))).length) {
        return Object.keys(pick(a.rawAttributes, Object.keys(updateData))).reduce(
          (p, c) => Object.assign(p, { [c]: updateData[c] }),
          {}
        );
      }
      return undefined;
    });

    try {
      // update rows
      const updatedRows = await Promise.all(
        [
          { mod: User, data: userData, where: { id: userId } },
          { mod: Profile, data: profileData, where: { userId } },
          { mod: WalletAddress, data: walletData, where: { userId } },
          // eslint-disable-next-line no-return-await
        ].map(async ({ mod, data, where }) =>
          data ? await mod.update(data, { where, returning: true, transaction: t }) : null
        )
      );
      await t.commit();
      // eslint-disable-next-line no-unused-vars
      return updatedRows.map(([_, rows]) => rows[0]);
    } catch (e) {
      await t.rollback();
      throw e;
    }
  },
  async findById(userId) {
    const user = await User.findByPk(userId, {
      include: [
        { association: 'profile' },
        { association: 'walletAddress' },
        {
          association: 'licenses',
          include: [{ association: 'attributes' }, { association: 'sale' }],
        },
        { association: 'sales' },
      ],
    });
    return user;
  },
  async findByAddress(address) {
    const user = await User.findOne({
      include: [
        { association: 'profile' },
        {
          where: { walletAddress: address },
          association: 'walletAddress',
        },
        {
          association: 'licenses',
          include: [{ association: 'attributes' }, { association: 'sale' }],
        },
        { association: 'sales' },
      ],
    });
    return user;
  },
  async queryAll(query = undefined) {
    const associations = [User, Profile, License, WalletAddress, TokenSale];
    const [userQueries, profileQueries, licenseQueries, walletAddressQueries, saleQueries] = query
      ? associations.map((a) => {
          if (Object.keys(pick(a.rawAttributes, Object.keys(query))).length) {
            const qs = Object.keys(pick(a.rawAttributes, Object.keys(query))).map((qk) => ({ [qk]: query[qk] }));
            return qs;
          }
          return undefined;
        })
      : Array.apply(undefined, { length: 5 });

    const foundUsers = await User.findAll({
      where: !userQueries ? undefined : { [Op.or]: userQueries },
      include: [
        {
          association: 'profile',
          where: !profileQueries ? {} : { [Op.or]: profileQueries },
        },
        {
          association: 'walletAddress',
          where: !walletAddressQueries ? undefined : { [Op.or]: walletAddressQueries },
        },
        {
          association: 'licenses',
          include: [{ association: 'attributes' }],
          where: !licenseQueries ? undefined : { [Op.or]: licenseQueries },
        },
        {
          where: !saleQueries ? undefined : { [Op.or]: saleQueries },
          association: 'sales',
        },
      ],
    });
    return foundUsers;
  },
  async findOne(data) {
    const user = await db.User.findOne(data);
    return user;
  },
  async delete(userId) {
    const t = await sequelize.transaction();
    try {
      const user = await User.destroy({ where: { id: userId } }, { transaction: t });
      return user;
    } catch (e) {
      await t.rollback();
      throw e;
    }
  },
};

module.exports = UserRepository;
