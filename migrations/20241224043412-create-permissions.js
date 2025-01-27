'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'permissions',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
          comment: 'Primary key, auto-incremented'
        },
        id_group: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'mnt_groups',
            key: 'id'
          },
          comment: 'Foreign key referencing the mnt_groups table'
        },
        permission: {
          type: Sequelize.STRING,
          allowNull: false,
          comment: 'Name or identifier of the permission'
        },
        description: {
          type: Sequelize.STRING,
          allowNull: false,
          comment: 'Detailed description of the permission'
        },
        is_active: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
          comment: 'Indicates if the permission is active'
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
        },
      },
      {
        comment: 'Table to manage permissions associated with maintenance groups'
      }
    );

    await queryInterface.addConstraint('permissions', {
      fields: ['id_group'],
      type: 'foreign key',
      name: 'fk_id_group',
      references: {
        table: 'mnt_groups',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('permissions');
  }
};
