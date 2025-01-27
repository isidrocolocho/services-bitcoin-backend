'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user, {
        foreignKey: 'id_user_created',
        as: 'creator'
      });
      this.belongsTo(models.mnt_tipo_registro, {
        foreignKey: 'id_tipo_registro',
        as: 'tipoRegistro'
      });
      // this.hasMany(models.permissions, {
      //   through: models.rol_permission,
      //   sourceKey: 'id',
      //   foreignKey: 'id_rol',
      // });
    }
  }
  user.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    nombres: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    foto_perfil: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    token: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    numero_telefono: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    id_user_created: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    id_tipo_registro: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'mnt_tipo_registro',
        key: 'id',
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'user',
    tableName: 'users'
  });
  return user;
};