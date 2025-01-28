'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'rols_permissions',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
          comment: 'Primary key, auto-incremented'
        },
        id_rol: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'rols',
            key: 'id'
          },
          comment: 'Foreign key referencing the rols table'
        },
        id_permission: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'permissions',
            key: 'id'
          },
          comment: 'Foreign key referencing the permissions table'
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          comment: 'Timestamp for when the record was created'
        },
        updatedAt: {
          allowNull: true,
          type: Sequelize.DATE,
          comment: 'Timestamp for when the record was udpate'
        },
        deletedAt: {
          allowNull: true,
          type: Sequelize.DATE,
          comment: 'Timestamp for soft deletion'
        },
      },
      {
        comment: 'Table to manage the relationship between roles and permissions'
      }
    );

    await queryInterface.addConstraint('rols_permissions', {
      fields: ['id_rol'],
      type: 'foreign key',
      name: 'fk_id_rol_permission',
      references: {
        table: 'rols',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('rols_permissions', {
      fields: ['id_permission'],
      type: 'foreign key',
      name: 'fk_id_permission_rol',
      references: {
        table: 'permissions',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('rols_permissions');
  }
};
