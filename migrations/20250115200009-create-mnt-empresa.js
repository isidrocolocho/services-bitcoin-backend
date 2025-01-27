'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('mnt_empresas', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: 'Identificador único de la empresa.',
      },
      nombre_empresa: {
        type: Sequelize.STRING(250),
        allowNull: false,
        comment: 'Nombre de la empresa.',
      },
      descripcion: {
        type: Sequelize.STRING(500),
        allowNull: true,
        comment: 'Descripción de la empresa.',
      },
      direccion: {
        type: Sequelize.STRING(500),
        allowNull: true,
        comment: 'Dirección de la empresa.',
      },
      ubicacion: {
        type: Sequelize.STRING(250),
        allowNull: true,
        comment: 'Ubicación geográfica de la empresa.',
      },
      foto_empresa: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: 'URL de la foto de la empresa.',
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        comment: 'Indicador si es activo'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        comment: 'Fecha y hora de creación de la empresa.',
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        comment: 'Fecha y hora de la última actualización de la empresa.',
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        comment: 'Timestamp for soft deletion'
      },
    },
    {
      comment: 'Tabla que almacena la información de lo la empresaes del sistema.', // Comentario para la tabla
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('mnt_empresas');
  }
};