module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('AttendeeTickets', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      ticket_ref_no: { type: Sequelize.STRING, allowNull: false },
      isCheckedIn: { type: Sequelize.BOOLEAN, default: 0 },
      eventTicketId: { type: Sequelize.INTEGER, allowNull: false, foreignKey: true, references: {model: 'EventTickets', key: 'id'} },
      attendeeId: { type: Sequelize.INTEGER, allowNull: false, foreignKey: true, references: {model: 'Attendees', key: 'id'} },
      eventId: { type: Sequelize.INTEGER, allowNull: false, foreignKey: true, references: {model: 'events', key: 'id'} },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('AttendeeTickets');
  }
};