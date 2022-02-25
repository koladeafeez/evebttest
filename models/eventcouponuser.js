const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class eventCouponUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      eventCouponUser.belongsTo(models.eventCoupon);
      eventCouponUser.belongsTo(models.event);
      eventCouponUser.belongsTo(models.event);
      eventCouponUser.belongsTo(models.Attendee);
    }
  }
  eventCouponUser.init({
    eventCouponId: { type: DataTypes.INTEGER, allowNull: false, references: {model: 'eventCoupon', key: 'id'} },
    attendeeId: { type: DataTypes.INTEGER, allowNull: false, references: {model: 'Attendee', key: 'id'} },
    eventId: { type: DataTypes.INTEGER, allowNull: false, references: {model: 'event', key: 'id'} },
  }, {
    sequelize,
    modelName: 'eventCouponUser',
  });
  return eventCouponUser;
};