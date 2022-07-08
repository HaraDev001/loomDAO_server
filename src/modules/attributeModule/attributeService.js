const attributeRepository = require('./attributeRepository');

const attributeService = {
  async createAttributeStore(data) {
    // Store the new attributes
    await attributeRepository.create(data);
  },
};

module.exports = attributeService;
