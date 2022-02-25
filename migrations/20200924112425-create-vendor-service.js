module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('vendorServices', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      vendorServiceCategoryId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'vendorServiceCategories', key: 'id' } },
      description: { type: Sequelize.TEXT, allowNull: false },
      experience_level: { type: Sequelize.STRING, allowNull: false },
      banner_image: { type: Sequelize.STRING, allowNull: false },
      price: { type: Sequelize.STRING, allowNull: false },
      approval_status: { type: Sequelize.STRING, defaultValue: "Awaiting approval" },
      isListed: { type: Sequelize.BOOLEAN, defaultValue: false },
      userId: { type: Sequelize.INTEGER, allowNull: false, references: {model: 'Users', key: 'id'} },
      deleted_by: { type: Sequelize.INTEGER, allowNull: true, },
      deleted_at: { type: Sequelize.DATE, allowNull: true, },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('vendorServices');
  }
};