const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class EventTickets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      EventTickets.belongsTo(models.event);
      EventTickets.hasMany(models.AttendeeTicket);
    }
  }

  EventTickets.init({
    eventId: { type: DataTypes.INTEGER, allowNull: false, foreignKey: true, references: {model: 'Events', key: 'id'} },
    type_of_ticket: DataTypes.STRING,
    description: DataTypes.TEXT,
    available_slots: DataTypes.INTEGER,
    no_sold: DataTypes.INTEGER,
    amount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'EventTickets',
  });
  return EventTickets;
};