module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('EventVendors', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      eventId: { type: Sequelize.INTEGER, allowNull: false, references: {model: 'events', key: 'id'} },
      vendorServiceId: { type: Sequelize.INTEGER, allowNull: false, references: {model: 'vendorServices', key: 'id'} },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
      deleted_at: { type: Sequelize.DATE },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('EventVendors');
  }
};