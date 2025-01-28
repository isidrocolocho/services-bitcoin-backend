'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('mnt_servicios', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        comment: 'ID del servicio encargado'
      },
      id_encargado: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: 'ID del encargado que ofrece el servicio',
      },
      servicio: {
        type: Sequelize.STRING(500),
        allowNull: false,
        comment: 'Nombre o descripción del servicio',
      },
      descripcion: {
        type: Sequelize.STRING(500),
        allowNull: false,
        comment: 'Descripción adicional del servicio',
      },
      foto_servicio: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: 'Foto representativa del servicio',
      },
      precio_servicio: {
        type: Sequelize.FLOAT,
        allowNull: false,
        comment: 'Precio del servicio',
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        comment: 'Indica si el servicio está activo',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        comment: 'Fecha de creación del servicio',
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        comment: 'Fecha de última actualización del servicio',
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        comment: 'Timestamp para eliminación suave (soft delete)'
      }
    },
    {
      comment: 'Tabla que almacena la información de los servicios encargado del sistema.' // Comentario para la tabla
    });

    // Agregar claves foráneas
    await queryInterface.addConstraint('mnt_servicios', {
      fields: ['id_encargado'],
      type: 'foreign key',
      name: 'fk_mnt_servicios_id_encargado',
      references: {
        table: 'mnt_encargados', // Tabla referenciada
        field: 'id', // Columna referenciada
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('mnt_servicios');
  }
};