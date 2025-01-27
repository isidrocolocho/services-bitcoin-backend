'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('mnt_encargados', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        comment: 'Identificador único del encargado'
      },
      id_user: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',  // Tabla referenciada
          key: 'id',  // Columna de referencia
        },
        allowNull: false,
        comment: 'ID del usuario asociado al encargado'
      },
      id_categoria: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        references: {
          model: 'mnt_categorias', // Tabla referenciada
          key: 'id', // Columna de referencia
        },
        comment: 'ID de la categoria del encargado'
      },
      id_empresa: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        references: {
          model: 'mnt_empresas', // Tabla referenciada
          key: 'id', // Columna de referencia
        },
        comment: 'ID del empresa asociado al encargado'
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        comment: 'Indicates if the encargado is active'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        comment: 'Fecha de creación del registro'
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        comment: 'Fecha de última actualización del registro'
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        comment: 'Timestamp para eliminación suave (soft delete)'
      }
    },
    {
      comment: 'Tabla que almacena la información de los médicos del sistema.' // Comentario para la tabla
    });

    // Agregar las restricciones de claves foráneas
    await queryInterface.addConstraint('mnt_encargados', {
      fields: ['id_user'],
      type: 'foreign key',
      name: 'fk_mnt_encargado_id_user',
      references: {
        table: 'users', // Tabla referenciada
        field: 'id', // Columna referenciada
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('mnt_encargados', {
      fields: ['id_categoria'],
      type: 'foreign key',
      name: 'fk_mnt_encargado_id_categoria',
      references: {
        table: 'mnt_categorias', // Tabla referenciada
        field: 'id', // Columna referenciada
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('mnt_encargados', {
      fields: ['id_empresa'],
      type: 'foreign key',
      name: 'fk_mnt_encargado_id_empresa',
      references: {
        table: 'mnt_empresas', // Tabla referenciada
        field: 'id', // Columna referenciada
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('mnt_encargados');
  }
};