'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'users', 
      {
          id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
          comment: 'Primary key, auto-incremented'
        },
        username: {
          type: Sequelize.STRING(200),
          allowNull: false,
          comment: 'User login name'
        },
        email: {
          type: Sequelize.STRING(200),
          allowNull: false,
          unique: true,
          comment: 'User email address'
        },
        password: {
          type: Sequelize.STRING(500),
          allowNull: false,
          comment: 'Encrypted user password'
        },
        nombres: {
          type: Sequelize.STRING(500),
          allowNull: false,
          comment: 'First name or names of the user'
        },
        apellido: {
          type: Sequelize.STRING(500),
          allowNull: false,
          comment: 'Last name of the user'
        },
        foto_perfil: {
          type: Sequelize.TEXT,
          allowNull: true,
          comment: 'Path or URL of the profile picture'
        },
        descripcion: {
          type: Sequelize.TEXT,
          allowNull: true,
          comment: 'User description or biography'
        },
        token: {
          type: Sequelize.STRING(500),
          allowNull: true,
          comment: 'Authentication or recovery token'
        },
        is_active: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
          comment: 'Indicates if the user account is active'
        },
        numero_telefono: {
          type: Sequelize.STRING(15),
          allowNull: true,
          comment: 'User phone number'
        },
        fecha_nacimiento: {
          type: Sequelize.DATEONLY,
          allowNull: true,
          comment: 'User birth date'
        },
        id_user_created: {
          type: Sequelize.INTEGER,
          allowNull: true,
          defaultValue: null,
          references: {
            model: 'users',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT',
          comment: 'References the user who created this record'
        },
        id_tipo_registro: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'mnt_tipo_registros',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          comment: 'Classification type of the user record'
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
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
        comment: 'Table to store user information' // Comment for the table
      }
    );

    await queryInterface.addConstraint('users', {
      fields: ['id_user_created'],
      type: 'foreign key',
      name: 'fk_users_id_user_created',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    });
    
    await queryInterface.addConstraint('users', {
      fields: ['id_tipo_registro'],
      type: 'foreign key',
      name: 'fk_users_id_tipo_registro',
      references: {
        table: 'mnt_tipo_registros',
        field: 'id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
    
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
