'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ctl_tipos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        comment: 'Primary key, auto-incremented',
      },
      tipo: {
        type: Sequelize.STRING(100),
        allowNull: false,
        comment: 'Tipo de momento servicios o productos',
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
      comment: 'Table to tipos',
    }
  );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ctl_tipos');
  }
};