module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ContactMessages', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      firstName: { type: Sequelize.STRING },
      lastName: { type: Sequelize.STRING },
      email: { type: Sequelize.STRING },
      phone: { type: Sequelize.STRING },
      message: { type: Sequelize.STRING },
      isRead: { type: Sequelize.BOOLEAN },
      country: { type: Sequelize.STRING },
      company: { type: Sequelize.STRING },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ContactMessages');
  }
};