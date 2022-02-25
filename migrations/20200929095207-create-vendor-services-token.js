module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('VendorServicesTokens', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      VendorServiceId: { type: Sequelize.INTEGER, allowNull: true, references: {model: 'vendorServices', key: 'id'} },
      token: { type: Sequelize.STRING },
      percentage_discount: { type: Sequelize.INTEGER },
      max_number_of_usage: { type: Sequelize.INTEGER },
      number_used: { type: Sequelize.INTEGER, defaultValue: 0 },
      expires_on: { type: Sequelize.DATE },
      created_by: { type: Sequelize.INTEGER, allowNull: true, references: {model: 'Users', key: 'id'} },
      deleted_at: { type: Sequelize.DATE, allowNull: true, },
      deleted_by: { type: Sequelize.INTEGER, allowNull: true, references: {model: 'Users', key: 'id'} },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('VendorServicesTokens');
  }
};