'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mnt_servicio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(sequelize.models.mnt_medico, {
        foreignKey: 'id_medico',
        as: 'medico',
      });
    
    }
  }
  mnt_servicio.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    id_medico: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    servicio: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    foto_servicio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    precio_servicio: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {
    sequelize,
    modelName: 'mnt_servicio',
    tableName: 'mnt_servicios',
  });
  return mnt_servicio;
};