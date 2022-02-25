module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      roleId: { type: Sequelize.INTEGER, allowNull: false, references: {model: 'Roles', key: 'id'} },
      title: { type: Sequelize.STRING, allowNull: true, },
      // user_type: { type: Sequelize.STRING, allowNull: true, },
      firstName: { type: Sequelize.STRING, allowNull: false, },
      middleName: { type: Sequelize.STRING, allowNull: true, },
      lastName: { type: Sequelize.STRING, allowNull: false, },
      gender: { type: Sequelize.STRING, allowNull: true, },
      email: { type: Sequelize.STRING, allowNull: false, unique: true },
      phone: { type: Sequelize.STRING, allowNull: true, },
      business_name: { type: Sequelize.STRING, allowNull: true, },
      type_of_business: { type: Sequelize.STRING, allowNull: true, },
      profile_picture: { type: Sequelize.STRING, allowNull: true, },
      document: { type: Sequelize.STRING, allowNull: true, },
      password: { type: Sequelize.STRING, allowNull: false, },
      isEmailVerified: { type: Sequelize.BOOLEAN, defaultValue: false, },
      email_verification_token: { type: Sequelize.STRING, allowNull: true, },
      email_verification_token_expires_on: { type: Sequelize.DATE, allowNull: true, },
      created_by: { type: Sequelize.INTEGER, allowNull: true, references: {model: 'Users', key: 'id'} },
      deleted_at: { type: Sequelize.DATE, allowNull: true, },
      deleted_by: { type: Sequelize.INTEGER, allowNull: true, references: {model: 'Users', key: 'id'} },
      password_reset_token: { type: Sequelize.STRING, allowNull: true, },
      password_reset_token_expires_on: { type: Sequelize.DATE, allowNull: true, },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};