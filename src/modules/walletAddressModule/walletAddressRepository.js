// Import Database

const db = require('../../database/models');

const WalletAddressRepository = {
  async create(data) {
    await db.WalletAddress.create(data);
  },

  async findByPk(id, inlcude) {
    const walletAddress = await db.WalletAddress.findByPk(id, inlcude);
    return walletAddress;
  },

  async findAll(data) {
    const walletAddress = await db.WalletAddress.findAll(data);
    return walletAddress;
  },

  async update(data, where) {
    await db.WalletAddress.update(data, where);
  },
  async findOne(data) {
    const walletAddress = await db.WalletAddress.findOne(data);
    return walletAddress;
  },
};

module.exports = WalletAddressRepository;
