const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class eventCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      eventCategory.belongsTo(models.User);
    }
  }
  eventCategory.init({
    name: DataTypes.STRING,
    description: {type: DataTypes.TEXT, allowNull: true},
    userId: { type: DataTypes.INTEGER, allowNull: true, foreignKey: true, references: {model: 'User', key: 'id'} },   //foreign
    updated_by: { type: DataTypes.INTEGER, allowNull: true, foreignKey: true, references: {model: 'User', key: 'id'} },   //foreign
    deleted_by: { type: DataTypes.INTEGER, allowNull: true, foreignKey: true, references: {model: 'User', key: 'id'} },   //foreign
    deleted_at: { type: DataTypes.DATE, allowNull: true }
  }, {
    sequelize,
    modelName: 'eventCategory',
  });
  return eventCategory;
};