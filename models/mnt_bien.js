'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mnt_bien extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(sequelize.models.mnt_encargado, {
        foreignKey: 'id_encargado',
        as: 'encargado',
      });
      this.belongsTo(sequelize.models.ctl_tipo, {
        foreignKey: 'id_tipo',
        as: 'tipo',
      });
    
    }
  }
  mnt_bien.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    id_encargado: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_tipo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    foto: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {
    sequelize,
    modelName: 'mnt_bien',
    tableName: 'mnt_bienes',
  });
  return mnt_bien;
};