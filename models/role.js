const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Role.hasMany(models.User, {as: 'users'});
    }
  }
  Role.init({
    name: { type: DataTypes.STRING, allowNull: false },
    comment: { type: DataTypes.STRING, allowNull: true },
  }, {
    sequelize,
    modelName: 'Role',
    timestamps: true
  });
  return Role;
};