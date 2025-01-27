'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rol_permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  rol_permission.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey:true,
      allowNull: false,
      autoIncrement:true,
    },
    id_rol: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: 'rols',
        key: 'id'
      }
    },
    id_permission:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: 'permissions',
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'rol_permission',
    tableName: 'rols_permissions'
  });
  return rol_permission;
};