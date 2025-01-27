'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mnt_hospital extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  mnt_hospital.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nombre_hospital: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    direccion: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    ubicacion: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    foto_hospital: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    is_active:{
      type:DataTypes.BOOLEAN,defaultValue:true,
    },
  }, {
    sequelize,
    modelName: 'mnt_hospital',
    tableName: 'mnt_hospitales',
  });
  return mnt_hospital;
};