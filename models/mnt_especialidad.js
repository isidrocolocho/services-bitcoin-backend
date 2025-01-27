'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mnt_especialidad extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  mnt_especialidad.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      especialidad: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
  }, {
    sequelize,
    modelName: 'mnt_especialidad',
    tableName: 'mnt_especialidades',
  });
  return mnt_especialidad;
};