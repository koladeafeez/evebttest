module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('EventTickets', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      eventId: { type: Sequelize.INTEGER, allowNull: false, foreignKey: true, references: {model: 'events', key: 'id'} },
      type_of_ticket: { type: Sequelize.STRING },
      description: { type: Sequelize.TEXT },
      available_slots: { type: Sequelize.INTEGER },
      no_sold: { type: Sequelize.INTEGER },
      amount: { type: Sequelize.INTEGER },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
      deleted_at: { type: Sequelize.DATE }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('EventTickets');
  }
};