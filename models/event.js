const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      event.belongsTo(models.User);
      event.belongsTo(models.eventCategory);
      event.hasMany(models.EventVendors);
      event.hasMany(models.EventTickets);
      event.hasMany(models.eventCoupon);
      event.hasMany(models.Attendee);
      event.hasMany(models.eventCouponUser);
    }
  }
  event.init({
    type_of_event: DataTypes.STRING,
    amount_paid: DataTypes.INTEGER,
    eventCategoryId: { type: DataTypes.INTEGER, allowNull: true, foreignKey: true, references: {model: 'eventCategory', key: 'id'} },
    event_title: DataTypes.STRING,
    experience_level: DataTypes.STRING,
    event_location: DataTypes.STRING,
    longitude: DataTypes.STRING,
    latitude: DataTypes.STRING,
    country: DataTypes.STRING,
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    zip_code: DataTypes.INTEGER,
    event_banner: DataTypes.STRING,
    description: DataTypes.TEXT,
    event_summary: DataTypes.STRING,
    tags: DataTypes.STRING,
    starting_date: DataTypes.DATEONLY,
    ending_date: DataTypes.DATEONLY,
    starting_time: DataTypes.STRING,
    ending_time: DataTypes.STRING,
    isRecuringEvent: DataTypes.BOOLEAN,
    isListed: DataTypes.BOOLEAN,
    event_recuring_ends: DataTypes.DATEONLY,
    event_recuring_frequency: DataTypes.STRING,
    expected_no_of_attendees: DataTypes.INTEGER,
    isApproved: DataTypes.BOOLEAN,
    approvedOrDisapproved_by: { type: DataTypes.INTEGER, allowNull: true, foreignKey: true, references: {model: 'User', key: 'id'} },
    reason_for_disapproval: { type: DataTypes.TEXT, allowNull: true },
    approvedOrDisapprovedAt: DataTypes.DATE,
    userId: { type: DataTypes.INTEGER, allowNull: false, foreignKey: true, references: {model: 'User', key: 'id'} },
    isSoldOut: DataTypes.BOOLEAN,
    isDeleted: DataTypes.BOOLEAN,
    deletedAt: DataTypes.DATE,
    deleted_by: { type: DataTypes.INTEGER, allowNull: true, foreignKey: true, references: {model: 'User', key: 'id'} },
  }, {
    sequelize,
    modelName: 'event',
  });
  return event;
};