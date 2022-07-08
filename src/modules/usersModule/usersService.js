const userRepository = require('./userRepository');

const usersService = {
  async findByPk(id) {
    const userFound = await userRepository.findByPk(id, {
      include: [
        { association: 'profile' },
        { association: 'walletAddress' },
        { association: 'sales' },
        { association: 'licenses' },
      ],
    });
    return userFound.dataValues;
  },
  async queryAll(query = undefined) {
    const usersFound = await userRepository.queryAll(query);
    return usersFound;
  },
  async createUser(userData) {
    const user = await userRepository.create(userData);
    return user;
  },
  async update(userId, updateData) {
    const updatedRows = await userRepository.update(userId, updateData);
    return updatedRows;
  },
  async findById(userId) {
    const userToFind = await userRepository.findById(userId);
    return userToFind;
  },
  async findByAddress(address) {
    const userToFind = await userRepository.findByAddress(address);
    return userToFind;
  },
  async delete(userId) {
    const deletedUser = await userRepository.delete(userId);
    return deletedUser;
  },
};

module.exports = usersService;
