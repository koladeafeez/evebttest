module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('eventCategories', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      name: { type: Sequelize.STRING },
      description: {type: Sequelize.TEXT, allowNull: true},
      userId: { type: Sequelize.INTEGER, allowNull: false, references: {model: 'Users', key: 'id'} },
      updated_by: { type: Sequelize.INTEGER, allowNull: false, references: {model: 'Users', key: 'id'} },
      deleted_by: { type: Sequelize.INTEGER, allowNull: true, references: {model: 'Users', key: 'id'} },
      deleted_at: { type: Sequelize.DATE },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('eventCategories');
  }
};