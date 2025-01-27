'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'mnt_routes',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
          comment: 'Primary key, auto-incremented'
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
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          comment: 'Name of the route'
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false,
          comment: 'Title displayed for the route'
        },
        path: {
          type: Sequelize.STRING,
          allowNull: false,
          comment: 'Path/URL of the route'
        },
        icon: {
          type: Sequelize.STRING,
          allowNull: false,
          comment: 'Icon representing the route'
        },
        description: {
          type: Sequelize.STRING,
          allowNull: false,
          comment: 'Description of the route'
        },
        orden: {
          type: Sequelize.INTEGER,
          allowNull: false,
          comment: 'Order of the route for display purposes'
        },
        id_ruta_padre: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'mnt_routes',
            key: 'id'
          },
          comment: 'Parent route, referencing the same table'
        },
        is_active: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
          comment: 'Indicates if the route is active'
        },
        visible: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
          comment: 'Indicates if the route is visible at submenu'
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
        comment: 'Table to manage application routes and their hierarchy'
      }
    );

    // Adding foreign key constraints
    await queryInterface.addConstraint('mnt_routes', {
      fields: ['id_permission'],
      type: 'foreign key',
      name: 'fk_id_permission_routes',
      references: {
        table: 'permissions',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    await queryInterface.addConstraint('mnt_routes', {
      fields: ['id_ruta_padre'],
      type: 'foreign key',
      name: 'fk_id_ruta_padre_routes',
      references: {
        table: 'mnt_routes',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('mnt_routes');
  }
};
