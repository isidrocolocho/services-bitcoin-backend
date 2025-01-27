'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ctl_estado_pago extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ctl_estado_pago.init({
    estado_pago: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'ctl_estado_pago',
    tableName: 'ctl_estado_pagos',
  });
  return ctl_estado_pago;
};