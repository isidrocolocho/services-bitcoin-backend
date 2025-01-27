'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('mnt_hospitales', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: 'Identificador único del hospital.',
      },
      nombre_hospital: {
        type: Sequelize.STRING(250),
        allowNull: false,
        comment: 'Nombre del hospital.',
      },
      descripcion: {
        type: Sequelize.STRING(500),
        allowNull: true,
        comment: 'Descripción del hospital.',
      },
      direccion: {
        type: Sequelize.STRING(500),
        allowNull: true,
        comment: 'Dirección del hospital.',
      },
      ubicacion: {
        type: Sequelize.STRING(250),
        allowNull: true,
        comment: 'Ubicación geográfica del hospital.',
      },
      foto_hospital: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: 'URL de la foto del hospital.',
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
        comment: 'Fecha y hora de creación del hospital.',
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        comment: 'Fecha y hora de la última actualización del hospital.',
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        comment: 'Timestamp for soft deletion'
      },
    },
    {
      comment: 'Tabla que almacena la información de los hospitales del sistema.', // Comentario para la tabla
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('mnt_hospitales');
  }
};