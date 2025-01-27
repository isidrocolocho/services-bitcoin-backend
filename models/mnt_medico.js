'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mnt_medico extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user, {
        foreignKey: 'id_user',  // Clave foránea en mnt_medicos
        as: 'user'  // Alias para la relación
      });

      // Relación con la tabla 'mnt_especialidad'
      this.belongsTo(models.mnt_especialidad, {
        foreignKey: 'id_especialidad',  // Clave foránea en mnt_medicos
        as: 'especialidad'  // Alias para la relación
      });

      // Relación con la tabla 'mnt_hospital'
      this.belongsTo(models.mnt_hospital, {
        foreignKey: 'id_hospital',  // Clave foránea en mnt_medicos
        as: 'hospital'  // Alias para la relación
      });
    }
  }
  mnt_medico.init({
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
    id_especialidad: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'mnt_especialidades',
        key: 'id',
      },
    },
    id_hospital: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'mnt_hospitales',
        key: 'id',
      },
    },
    numero_junta: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    precio_consulta: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    tiempo_consulta: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    is_active:{
      type:DataTypes.BOOLEAN,defaultValue:true,
    },
  }, {
    sequelize,
    modelName: 'mnt_medico',
    tableName: 'mnt_medicos',
  });
  
  return mnt_medico;
};