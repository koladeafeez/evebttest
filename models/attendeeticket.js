const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class AttendeeTicket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      AttendeeTicket.belongsTo(models.Attendee);
      AttendeeTicket.belongsTo(models.EventTickets);
    }
  }
  AttendeeTicket.init({
    ticket_ref_no: { type: DataTypes.STRING, allowNull: false },
    isCheckedIn: { type: DataTypes.BOOLEAN, default: 0 },
    eventTicketId: { type: DataTypes.INTEGER, allowNull: false, foreignKey: true, references: {model: 'EventTickets', key: 'id'} },
    attendeeId: { type: DataTypes.INTEGER, allowNull: false, foreignKey: true, references: {model: 'Attendee', key: 'id'} },
    eventId: { type: DataTypes.INTEGER, allowNull: false, foreignKey: true, references: {model: 'events', key: 'id'} },
  }, {
    sequelize,
    modelName: 'AttendeeTicket',
  });
  return AttendeeTicket;
};