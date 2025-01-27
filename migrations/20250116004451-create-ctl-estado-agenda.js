'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ctl_estado_agendas', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        comment: 'Campo ID principal, clave primaria de la tabla',
      },
      estado: {
        type: Sequelize.STRING(250),
        allowNull: false,
        comment: 'Nombre del estado (ejemplo: Agendada, En proceso, Finalizada)',
      },
      color: {
        type: Sequelize.STRING(16),
        allowNull: false,
        comment: 'Código hexadecimal del color asociado al estado',
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
      comment: 'Tabla que almacena la información de los estados de la agenda de los medicos del sistema.' // Comentario para la tabla
    });

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ctl_estado_agendas');
  }
};