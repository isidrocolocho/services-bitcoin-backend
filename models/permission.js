'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class permissions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  permissions.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey:true,
      allowNull: false,
      autoIncrement:true,
    },
    id_group: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: 'mnt_groups',
        key: 'id'
      }
    },
    permission: {
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
    modelName: 'permission',
    tableName: 'permissions'
  });
  return permissions;
};