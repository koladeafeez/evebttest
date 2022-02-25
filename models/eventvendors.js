const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class EventVendors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // relationships here
      EventVendors.belongsTo(models.event);
      EventVendors.belongsTo(models.vendorService);
    }
  }

  EventVendors.init({
    eventId: { type: DataTypes.INTEGER, allowNull: false, references: {model: 'Events', key: 'id'} },
    vendorServiceId: { type: DataTypes.INTEGER, allowNull: false, references: {model: 'VendorServices', key: 'id'} },
  }, {
    sequelize,
    modelName: 'EventVendors',
  });
  return EventVendors;
};