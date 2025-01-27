'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'users_rols',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
          comment: 'Primary key, auto-incremented'
        },
        id_user: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id'
          },
          comment: 'Foreign key referencing the users table'
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
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          comment: 'Timestamp for when the record was created'
        },
        deletedAt: {
          allowNull: true,
          type: Sequelize.DATE,
          comment: 'Timestamp for soft deletion'
        },
      },
      {
        comment: 'Table to manage the many-to-many relationship between users and roles'
      }
    );

    await queryInterface.addConstraint('users_rols', {
      fields: ['id_user'],
      type: 'foreign key',
      name: 'fk_user_id',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('users_rols', {
      fields: ['id_rol'],
      type: 'foreign key',
      name: 'fk_rol_id',
      references: {
        table: 'rols',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users_rols');
  }
};
