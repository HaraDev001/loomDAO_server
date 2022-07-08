const licenseRepository = require('./licenseRopsitory');

const productsService = {
  async createLicenseStore(data) {
    // Store the new license
    await licenseRepository.create(data);
  },

  async query(data) {
    // query products

    // Query by mail
    const productToFind = await licenseRepository.findAll({
      where: { name: data },
      // eslint-disable-next-line prettier/prettier
      include: [
        { association: 'attributes' },
        { association: 'users' },
        { association: 'nft' },
      ],
    });
    return productToFind;
  },

  async queryAll() {
    // query products

    // Query by mail
    const productToFind = await licenseRepository.findAll({
      // eslint-disable-next-line prettier/prettier
      include: [
        { association: 'attributes' },
        { association: 'users' },
        { association: 'nft' },
      ],
    });
    return productToFind;
  },

  async updateStore(data) {
    // update license information
    await licenseRepository.update(
      {
        tokenId: data.tokenId,
        name: data.name,
      },
      {
        where: { id: data.id },
      }
    );
  },

  async findByPk(id) {
    const licenseFound = await licenseRepository.findByPk(id, {
      // eslint-disable-next-line prettier/prettier
      include: [
        { association: 'attributes' },
        { association: 'users' },
        { association: 'nft' },
      ],
    });

    // eslint-disable-next-line no-return-await
    return licenseFound.dataValues;
  },

  async findDataByPk(id) {
    const licenseFound = await licenseRepository.findByPk(id, {
      // eslint-disable-next-line prettier/prettier
      include: [
        { association: 'attributes' },
        { association: 'users' },
        { association: 'nft' },
      ],
    });

    // eslint-disable-next-line no-return-await
    return licenseFound.dataValues.metadataCid;
  },

  async delete(data) {
    // eslint-disable-next-line no-unused-vars
    const licenseFound = await licenseRepository.delete({
      where: { id: data },
    });
  },
};

module.exports = productsService;
