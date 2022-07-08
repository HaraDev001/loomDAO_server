// Import Database

const db = require('../../database/models');

const AttributeRepository = {
  async create(data) {
    await db.Attribute.create(data);
  },

  async findByPk(data) {
    await db.Attribute.findByPk(data);
  },

  async findAll(data) {
    await db.Attribute.findByPk(data);
  },

  async update(data) {
    await db.Attribute.update(data);
  },
};

module.exports = AttributeRepository;
