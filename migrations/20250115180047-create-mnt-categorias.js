'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('mnt_categorias', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: 'Primary key, auto-incremented',
      },
      categoria: {
        type: Sequelize.STRING(250),
        allowNull: false,
        comment: 'Nombre de categorias empresa',
      },
      descripcion: {
        type: Sequelize.STRING(500),
        allowNull: true,
        comment: 'Descripcion de la categorias empresa',
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        comment: 'Validador de la categorias empresa, si es activo o desactivo',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        comment: 'Timestamp for when the record was created',
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        comment: 'Timestamp for when the record was last updated',
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        comment: 'Timestamp for soft deletion',
      },
    },
    {
      comment: 'Tabla de las categorias de empresas',
    }
  );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('mnt_categorias');
  }
};