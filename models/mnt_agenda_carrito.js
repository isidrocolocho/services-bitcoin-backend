'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mnt_agenda_carrito extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.mnt_encargado, {
        foreignKey: 'id_encargado',
        as: 'encargado',
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

  mnt_agenda_carrito.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_encargado: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_estado_agenda: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      fecha_hora_inicio: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      fecha_hora_fin: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      conclusion: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      id_estado_pago: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      sub_total: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      descuento: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      total: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'mnt_agenda_carrito',
      tableName: 'mnt_agenda_carritos',
    }
  );

  return mnt_agenda_carrito;
};
