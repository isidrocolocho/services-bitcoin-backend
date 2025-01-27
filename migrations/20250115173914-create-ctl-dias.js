'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ctl_dias', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        comment: 'Primary key, auto-incremented',
      },
      dia: {
        type: Sequelize.STRING(100),
        allowNull: false,
        comment: 'Name of the day',
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
      comment: 'Table to store days of the week',
    }
  );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ctl_dias');
  }
};