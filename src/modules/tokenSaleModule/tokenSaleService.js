const tokenSaleRepository = require('./tokenSaleRopository');

const productsService = {
  async createTokenSaleStore(data) {
    // Store the new TokenSale
    await tokenSaleRepository.create(data);
  },

  async tokenSaleFindByPk(id) {
    const TokenSaleFound = await tokenSaleRepository.findByPk(id, {
      // eslint-disable-next-line prettier/prettier
      include: [
        { association: 'user' },
        { association: 'license' },
      ],
    });

    // eslint-disable-next-line no-return-await
    return TokenSaleFound;
  },
};

module.exports = productsService;
