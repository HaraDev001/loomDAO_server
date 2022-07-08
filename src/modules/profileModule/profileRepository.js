// Import Database

const db = require('../../database/models');

const ProfileRepository = {
  async create(data) {
    await db.Profile.create(data);
  },

  async findByPk(id, inlcude) {
    const Profile = await db.Profile.findByPk(id, inlcude);
    return Profile;
  },

  async findAll(data) {
    const Profile = await db.Profile.findAll(data);
    return Profile;
  },

  async update(data, where) {
    await db.Profile.update(data, where);
  },
  async findOne(data) {
    const Profile = await db.Profile.findOne(data);
    return Profile;
  },
};

module.exports = ProfileRepository;
