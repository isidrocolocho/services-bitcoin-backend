'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rol extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.user, {
        through: models.user_rol,
        foreignKey: 'id_rol',
        otherKey: 'id_user',
        as: 'users',
      });
      
      this.belongsToMany(models.permission, {
        through: models.rol_permission,
        foreignKey: 'id_rol',
        otherKey: 'id_permission',
        as: 'permissions',
      });
    }
  }
  rol.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey:true,
      allowNull: false,
      autoIncrement:true,
    },
    rol: {
      type:DataTypes.STRING,allowNull: false,
    },
    description:{
      type:DataTypes.STRING,allowNull: false,
    },
    is_active:{
      type:DataTypes.BOOLEAN,defaultValue:true,
    },
  }, {
    sequelize,
    modelName: 'rol',
    tableName: 'rols'
  });
  return rol;
};