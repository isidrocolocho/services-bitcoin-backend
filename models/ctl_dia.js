'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ctl_dia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ctl_dia.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    dia: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'ctl_dia',
    tableName: 'ctl_dias',
  });
  return ctl_dia;
};