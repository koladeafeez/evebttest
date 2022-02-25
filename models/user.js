const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Role);
      User.hasMany(models.vendorService);
      User.hasMany(models.vendorServiceCategory);
      User.hasMany(models.eventCategory);
      User.hasMany(models.event);
      User.hasMany(models.Attendee);
    }
  }
  User.init({
    roleId: { type: DataTypes.INTEGER, allowNull: false, foreignKey: true }, //foreign
    title: { type: DataTypes.STRING, allowNull: true, },
    firstName: { type: DataTypes.STRING, allowNull: false, },
    middleName: { type: DataTypes.STRING, allowNull: true, },
    lastName: { type: DataTypes.STRING, allowNull: false, },
    gender: { type: DataTypes.STRING, allowNull: true, },
    email: { type: DataTypes.STRING, allowNull: false, unique: true},
    phone: { type: DataTypes.STRING, allowNull: true, },
    business_name: { type: DataTypes.STRING, allowNull: true, },
    type_of_business: { type: DataTypes.STRING, allowNull: true, },
    profile_picture: { type: DataTypes.STRING, allowNull: true, },
    document: { type: DataTypes.STRING, allowNull: true, },
    password: { type: DataTypes.STRING, allowNull: false, },
    isEmailVerified: { type: DataTypes.BOOLEAN, defaultValue: false, },
    email_verification_token: { type: DataTypes.STRING, allowNull: true, },
    email_verification_token_expires_on: { type: DataTypes.DATE, allowNull: true, },
    created_by: { type: DataTypes.INTEGER, allowNull: true, foreignKey: true },   //foreign
    deleted_at: { type: DataTypes.DATE, allowNull: true, },
    deleted_by: { type: DataTypes.INTEGER, allowNull: true, foreignKey: true },  //foreign
    password_reset_token: { type: DataTypes.STRING, allowNull: true, },
    password_reset_token_expires_on: { type: DataTypes.DATE, allowNull: true, },
  }, {
    sequelize,
    modelName: 'User',
    timestamps: true
  });
  return User;
};