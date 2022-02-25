const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class vendorService extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      vendorService.belongsTo(models.User);
      vendorService.hasMany(models.VendorServicesToken);
      vendorService.hasMany(models.EventVendors);
      vendorService.belongsTo(models.vendorServiceCategory);
    }
  }
  vendorService.init({
    vendorServiceCategoryId: { type: DataTypes.INTEGER, allowNull: false, foreignKey: true, references: {model: 'vendorServiceCategory', key: 'id'} }, //foreign key
    description: DataTypes.TEXT,
    experience_level: DataTypes.STRING,
    banner_image: DataTypes.STRING,
    price: DataTypes.STRING,
    approval_status: DataTypes.STRING,
    isListed: DataTypes.BOOLEAN,
    userId: { type: DataTypes.INTEGER, allowNull: true, foreignKey: true, references: {model: 'User', key: 'id'} },   //foreign
    deleted_by: DataTypes.INTEGER,
    deleted_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'vendorService',
  });
  return vendorService;
};