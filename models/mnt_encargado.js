'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mnt_encargado extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user, {
        foreignKey: 'id_user',  // Clave foránea en mnt_encargados
        as: 'user'  // Alias para la relación
      });

      // Relación con la tabla 'mnt_categoria'
      this.belongsTo(models.mnt_categoria, {
        foreignKey: 'id_categoria',  // Clave foránea en mnt_encargados
        as: 'categoria'  // Alias para la relación
      });

      // Relación con la tabla 'mnt_empresa'
      this.belongsTo(models.mnt_empresa, {
        foreignKey: 'id_empresa',  // Clave foránea en mnt_encargados
        as: 'empresa'  // Alias para la relación
      });
    }
  }
  mnt_encargado.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    id_categoria: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'mnt_categorias',
        key: 'id',
      },
    },
    id_empresa: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'mnt_empresas',
        key: 'id',
      },
    },
    is_active:{
      type:DataTypes.BOOLEAN,defaultValue:true,
    },
  }, {
    sequelize,
    modelName: 'mnt_encargado',
    tableName: 'mnt_encargados',
  });
  
  return mnt_encargado;
};