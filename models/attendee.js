const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Attendee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Attendee.belongsTo(models.event);
      Attendee.hasMany(models.AttendeeTicket);
      Attendee.belongsTo(models.User);
      Attendee.hasOne(models.eventCouponUser);
    }
  }
  Attendee.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    amount_paid: DataTypes.INTEGER,
    no_of_tickets_bought: DataTypes.INTEGER,
    userId: { type: DataTypes.INTEGER, allowNull: true, foreignKey: true, references: {model: 'User', key: 'id'} },
    eventId: { type: DataTypes.INTEGER, allowNull: false, references: {model: 'Events', key: 'id'} },
    payment_method: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Attendee',
  });
  return Attendee;
};