'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class shopperGameLibrary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  shopperGameLibrary.init({
    gameId: DataTypes.INTEGER,
    shopperId: DataTypes.INTEGER,
    hidden: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'shopperGameLibrary',
  });
  return shopperGameLibrary;
};