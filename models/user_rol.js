'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_rol extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_rol.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey:true,
      allowNull: false,
      autoIncrement:true,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: 'user',
        key: 'id'
      }
    },
    id_rol: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: 'rol',
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'user_rol',
    tableName: 'users_rols'
  });
  return user_rol;
};