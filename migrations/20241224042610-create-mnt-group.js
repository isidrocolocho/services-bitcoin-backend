'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'mnt_groups',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
          comment: 'Primary key, auto-incremented'
        },
        group: {
          type: Sequelize.STRING,
          allowNull: false,
          comment: 'Name of the group'
        },
        description: {
          type: Sequelize.STRING,
          allowNull: false,
          comment: 'Detailed description of the group'
        },
        is_active: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
          comment: 'Indicates if the group is active'
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
        comment: 'Table to manage maintenance groups'
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('mnt_groups');
  }
};
