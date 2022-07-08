// Import Database

const db = require('../../database/models');

const LicenseRepository = {
  async create(data) {
    await db.License.create(data);
  },

  async findByPk(id, inlcude) {
    const License = await db.License.findByPk(id, inlcude);
    return License;
  },

  async findAll(data) {
    const License = await db.License.findAll(data);
    return License;
  },

  async update(data, where) {
    await db.License.update(data, where);
  },

  async findOne(data) {
    const License = await db.License.findOne(data);
    return License;
  },

  async delete(data) {
    // eslint-disable-next-line no-unused-vars
    const User = await db.License.destroy(data);
  },
};

module.exports = LicenseRepository;
