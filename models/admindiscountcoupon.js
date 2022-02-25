const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AdminDiscountCoupon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      AdminDiscountCoupon.belongsTo(models.User);
      AdminDiscountCoupon.hasMany(models.AdminDiscountCouponUser);
    }
  }
  AdminDiscountCoupon.init({
    product_type: { type: DataTypes.STRING, allowNull: false },
    coupon: { type: DataTypes.STRING },
    percentage_discount: { type: DataTypes.INTEGER },
    max_no_of_usage: { type: DataTypes.INTEGER },
    number_used: { type: DataTypes.INTEGER },
    expires_on: { type: DataTypes.DATE },
    createdAt: { allowNull: false, type: DataTypes.DATE },
    userId: { type: DataTypes.INTEGER, allowNull: true, references: {model: 'Users', key: 'id'} },
    updatedAt: { allowNull: false, type: DataTypes.DATE },      
    deletedAt: { type: DataTypes.DATE },
    deletedBy: { type: DataTypes.INTEGER, allowNull: true, references: {model: 'Users', key: 'id'} },
  }, {
    sequelize,
    modelName: 'AdminDiscountCoupon',
  });
  return AdminDiscountCoupon;
};