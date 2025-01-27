'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mnt_group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  mnt_group.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey:true,
      allowNull: false,
      autoIncrement:true,
    },
    group: {
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
    modelName: 'mnt_group',
    tableName: 'mnt_groups'
  });
  return mnt_group;
};