const profileRepository = require('./profileRepository');

const profileService = {
  async createUserProfileStore(data) {
    // Store the new profiles
    await profileRepository.create(data);
  },

  async findAll(data) {
    const profileToFind = await profileRepository.findAll({
      where: { email: data },
    });
    return profileToFind;
  },
};

module.exports = profileService;
