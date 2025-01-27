'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mnt_agenda_medica extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.mnt_medico, {
        foreignKey: 'id_medico',
        as: 'medico',
      });

      this.belongsTo(models.user, {
        foreignKey: 'id_user',
        as: 'user',
      });

      this.belongsTo(models.ctl_estado_agenda, {
        foreignKey: 'id_estado_agenda',
        as: 'estadoAgenda',
      });

      this.belongsTo(models.ctl_estado_pago, {
        foreignKey: 'id_estado_pago',
        as: 'estadoPago',
      });
    }
  }
  mnt_agenda_medica.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
     
    },
    id_medico: {
      type: DataTypes.INTEGER,
      allowNull: false,
      
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      
      //comment: 'Identificador del usuario asociado',
    },
    id_estado_agenda: {
      type: DataTypes.INTEGER,
      allowNull: false,
      //comment: 'Estado actual de la agenda médica',
    },
    fecha_hora_consulta: {
      type: DataTypes.DATE,
      allowNull: false,
      //comment: 'Fecha y hora de inicio de la consulta',
    },
    fecha_hora_fin: {
      type: DataTypes.DATE,
      allowNull: true,
      //comment: 'Fecha y hora de finalización de la consulta',
    },
    descripcion: {
      type: DataTypes.STRING(500),
      allowNull: true,
     // comment: 'Descripción general de la consulta',
    },
    diagnostico: {
      type: DataTypes.TEXT,
      allowNull: true,
      //comment: 'Diagnóstico del médico',
    },
    receta: {
      type: DataTypes.TEXT,
      allowNull: true,
     // comment: 'Receta médica emitida',
    },
    valoracion: {
      type: DataTypes.FLOAT,
      allowNull: true,
      //comment: 'Valoración dada por el usuario',
    },
    comentario: {
      type: DataTypes.TEXT,
      allowNull: true,
      //comment: 'Comentario adicional sobre la consulta',
    },
    id_estado_pago: {
      type: DataTypes.INTEGER,
      allowNull: true,
      //comment: 'Estado del pago asociado',
    },
    sub_total: {
      type: DataTypes.FLOAT,
      allowNull: false,
      //comment: 'Subtotal de los costos de la consulta',
    },
    descuento: {
      type: DataTypes.FLOAT,
      allowNull: true,
      //comment: 'Descuento aplicado al subtotal',
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
      //comment: 'Costo total de la consulta',
    },
  }, {
    sequelize,
    modelName: 'mnt_agenda_medica',
    tableName: 'mnt_agenda_medicas',
  });
  return mnt_agenda_medica;
};