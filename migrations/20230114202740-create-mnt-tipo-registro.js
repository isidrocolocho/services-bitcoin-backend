'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('mnt_tipo_registros', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: 'Identificador único del registro.',
      },
      tipo_registro: {
        type: Sequelize.STRING(250),
        allowNull: false,
        comment: 'Tipo del registro, por ejemplo: Admin, Empresa, Cliente.',
      },
      descripcion: {
        type: Sequelize.STRING(250),
        allowNull: true,
        comment: 'Descripción breve del tipo de registro.',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        comment: 'Fecha y hora de creación del registro.',
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        comment: 'Fecha y hora de la última actualización del registro.',
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        comment: 'Timestamp for soft deletion'
      },
    },
    {
      comment: 'Tabla que almacena los diferentes tipos de registros para el sistema.', // Comentario para la tabla
    }
  );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('mnt_tipo_registros');
  }
};