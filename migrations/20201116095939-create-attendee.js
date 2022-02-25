module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Attendees', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      firstName: { type: Sequelize.STRING },
      lastName: { type: Sequelize.STRING },
      email: { type: Sequelize.STRING },
      phone: { type: Sequelize.STRING },
      amount_paid: { type: Sequelize.INTEGER },
      no_of_tickets_bought: { type: Sequelize.INTEGER },
      userId: { type: Sequelize.INTEGER, allowNull: true, foreignKey: true, references: {model: 'Users', key: 'id'} },
      eventId: { type: Sequelize.INTEGER, allowNull: false, foreignKey: true, references: {model: 'events', key: 'id'} },
      payment_method: { type: Sequelize.STRING },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Attendees');
  }
};