const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class VendorServicesToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      VendorServicesToken.belongsTo(models.vendorService);
    }
  }
  VendorServicesToken.init({
    VendorServiceId: { type: DataTypes.INTEGER, allowNull: false, foreignKey: true },
    token: DataTypes.STRING,
    percentage_discount: DataTypes.INTEGER,
    max_number_of_usage: DataTypes.INTEGER,
    number_used: { type: DataTypes.INTEGER, defaultValue: 0, },
    expires_on: DataTypes.DATE,
    created_by: { type: DataTypes.INTEGER, allowNull: true, foreignKey: true },   //foreign
    deleted_at: { type: DataTypes.DATE, allowNull: true, },
    deleted_by: { type: DataTypes.INTEGER, allowNull: true, foreignKey: true },  //foreign
  }, {
    sequelize,
    modelName: 'VendorServicesToken',
    timestamps: true
  });
  return VendorServicesToken;
};