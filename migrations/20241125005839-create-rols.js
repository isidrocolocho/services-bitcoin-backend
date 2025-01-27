'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'rols',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
          comment: 'Primary key, auto-incremented'
        },
        rol: {
          type: Sequelize.STRING,
          allowNull: false,
          comment: 'Name of the role'
        },
        description: {
          type: Sequelize.STRING,
          allowNull: false,
          comment: 'Detailed description of the role'
        },
        is_active: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
          comment: 'Indicates if the role is active'
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          comment: 'Timestamp for when the record was created'
        },
        updatedAt: {
          allowNull: true,
          type: Sequelize.DATE,
          comment: 'Timestamp for when the record was last updated'
        },
        deletedAt: {
          allowNull: true,
          type: Sequelize.DATE,
          comment: 'Timestamp for soft deletion'
        }
      },
      {
        comment: 'Table to store roles information' // Comment for the table
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('rols');
  }
};
