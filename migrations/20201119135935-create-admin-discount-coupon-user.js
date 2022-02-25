module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('AdminDiscountCouponUsers', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      adminDiscountCouponId: { type: Sequelize.INTEGER, allowNull: false, references: {model: 'AdminDiscountCoupons', key: 'id'} },
      userId: { type: Sequelize.INTEGER, allowNull: false, references: {model: 'Users', key: 'id'} },
      product_used_on: { type: Sequelize.INTEGER, allowNull: false },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('AdminDiscountCouponUsers');
  }
};