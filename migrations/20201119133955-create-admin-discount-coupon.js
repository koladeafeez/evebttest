module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('AdminDiscountCoupons', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      product_type: { type: Sequelize.STRING, allowNull: false },
      coupon: { type: Sequelize.STRING },
      percentage_discount: { type: Sequelize.INTEGER },
      max_no_of_usage: { type: Sequelize.INTEGER },
      number_used: { type: Sequelize.INTEGER, default: 0 },
      expires_on: { type: Sequelize.DATE },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      userId: { type: Sequelize.INTEGER, allowNull: true, references: {model: 'Users', key: 'id'} },
      updatedAt: { allowNull: false, type: Sequelize.DATE },      
      deletedAt: { type: Sequelize.DATE },
      deletedBy: { type: Sequelize.INTEGER, allowNull: true, references: {model: 'Users', key: 'id'} },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('AdminDiscountCoupons');
  }
};