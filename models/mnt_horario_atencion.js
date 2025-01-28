'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mnt_horario_atencion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Relación con la tabla 'mnt_encargados'
      this.belongsTo(sequelize.models.mnt_encargado, {
        foreignKey: 'id_encargado',
        as: 'encargado',
      });

      // Relación con la tabla 'ctl_dias'
      this.belongsTo(sequelize.models.ctl_dia, {
        foreignKey: 'id_dia',
        as: 'dia',
      });
    }
  }
  mnt_horario_atencion.init({
    id_encargado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'mnt_encargado', // Cambiar a la tabla correcta si es diferente
        key: 'id',
      },
    },
    id_dia: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ctl_dia', // Cambiar a la tabla correcta si es diferente
        key: 'id',
      },
    },
    hora_inicio: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    hora_fin: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'mnt_horario_atencion',
    tableName: 'mnt_horario_atenciones',
  });
  return mnt_horario_atencion;
};