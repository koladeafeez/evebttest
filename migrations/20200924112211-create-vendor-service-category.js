module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('vendorServiceCategories', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      name: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.TEXT, allowNull: true },
      userId: { type: Sequelize.INTEGER, allowNull: true, references: {model: 'Users', key: 'id'} },
      deleted_by: { type: Sequelize.INTEGER, allowNull: true, references: {model: 'Users', key: 'id'} },
      deleted_at: { type: Sequelize.DATE, allowNull: true },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updated_by: { type: Sequelize.INTEGER, allowNull: true, references: {model: 'Users', key: 'id'} },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('vendorServiceCategories');
  }
};