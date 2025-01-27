'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ctl_estado_pagos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        comment: 'Identificador único del estado de pago',
      },
      estado_pago: {
        type: Sequelize.STRING(250),
        allowNull: false,
        comment: 'Descripción del estado de pago (e.g., Pendiente, Pagado)',
      },
      color: {
        type: Sequelize.STRING(50),
        allowNull: true,
        comment: 'Color representativo del estado de pago en formato hexadecimal o nombre',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        comment: 'Timestamp de creación del registro',
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        comment: 'Timestamp de la última actualización del registro',
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        comment: 'Timestamp para eliminación suave (soft delete)',
      },
    },
    {
      comment: 'Tabla que almacena los diferentes estados de pago',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ctl_estado_pagos');
  }
};