'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mnt_route extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  mnt_route.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey:true,
      allowNull: false,
      autoIncrement:true,
    },
    id_permission:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: 'permissions',
        key: 'id'
      }
    },
    path: {
      type:DataTypes.STRING,allowNull: false,
    },
    router: {
      type:DataTypes.STRING,allowNull: false,
    },
    icon: {
      type:DataTypes.STRING,allowNull: false,
    },
    description:{
      type:DataTypes.STRING,allowNull: false,
    },
    orden:{
      type:DataTypes.INTEGER,allowNull: false,
    },
    id_ruta_padre:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: 'mnt_routes',
        key: 'id'
      }
    },
    visible:{
      type:DataTypes.BOOLEAN,defaultValue:true,
    },
    is_active:{
      type:DataTypes.BOOLEAN,defaultValue:true,
    },
  }, {
    sequelize,
    modelName: 'mnt_route',
    tableName: 'mnt_routes',
  });
  return mnt_route;
};