module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('eventCouponUsers', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      eventCouponId: { type: Sequelize.INTEGER, allowNull: false, references: {model: 'eventCoupons', key: 'id'} },
      attendeeId: { type: Sequelize.INTEGER, allowNull: false, references: {model: 'Attendees', key: 'id'} },
      eventId: { type: Sequelize.INTEGER, allowNull: false, references: {model: 'events', key: 'id'} },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('eventCouponUsers');
  }
};