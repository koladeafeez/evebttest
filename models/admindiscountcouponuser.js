const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AdminDiscountCouponUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      AdminDiscountCouponUser.belongsTo(models.AdminDiscountCoupon);
      AdminDiscountCouponUser.belongsTo(models.User);
    }
  }
  AdminDiscountCouponUser.init({
    AdminDiscountCouponId: { type: DataTypes.INTEGER, allowNull: false, references: {model: 'AdminDiscountCoupons', key: 'id'} },
    userId: { type: DataTypes.INTEGER, allowNull: false, references: {model: 'Users', key: 'id'} },
    product_used_on: { type: DataTypes.INTEGER, allowNull: false },
  }, {
    sequelize,
    modelName: 'AdminDiscountCouponUser',
  });
  return AdminDiscountCouponUser;
};