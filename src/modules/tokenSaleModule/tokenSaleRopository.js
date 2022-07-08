// Import Database

const db = require('../../database/models');

const TokenSaleRepository = {
  async create(data) {
    await db.TokenSale.create(data);
  },

  async findByPk(id, inlcude) {
    const TokenSale = await db.TokenSale.findByPk(id, inlcude);
    return TokenSale;
  },

  async findAll(data) {
    const TokenSale = await db.TokenSale.findAll(data);
    return TokenSale;
  },

  async update(data, where) {
    await db.TokenSale.update(data, where);
  },
  async findOne(data) {
    const TokenSale = await db.TokenSale.findOne(data);
    return TokenSale;
  },
};

module.exports = TokenSaleRepository;
