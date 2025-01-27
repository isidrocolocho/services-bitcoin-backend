'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ctl_estado_agenda extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ctl_estado_agenda.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING(16),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'ctl_estado_agenda',
    tableName: 'ctl_estado_agendas',
  });
  return ctl_estado_agenda;
};