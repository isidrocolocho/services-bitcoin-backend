'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('mnt_bienes', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        comment: 'ID del bienes encargado'
      },
      id_encargado: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: 'ID del encargado que ofrece el bienes',
      },
      id_tipo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: 'ID del tipo de bienes',
      },
      nombre: {
        type: Sequelize.STRING(500),
        allowNull: false,
        comment: 'Nombre o descripción de los bienes',
      },
      descripcion: {
        type: Sequelize.STRING(500),
        allowNull: false,
        comment: 'Descripción adicional del bienes',
      },
      foto: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: 'Foto representativa',
      },
      cantidad: {
        type: Sequelize.INTEGER,
        allowNull: true,
        comment: 'cantidad en caso de se producto',
      },
      precio: {
        type: Sequelize.FLOAT,
        allowNull: false,
        comment: 'Precio del bien',
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        comment: 'Indica si el bienes está activo',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        comment: 'Fecha de creación del bienes',
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        comment: 'Fecha de última actualización del bienes',
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        comment: 'Timestamp para eliminación suave (soft delete)'
      }
    },
    {
      comment: 'Tabla que almacena la información de los bienes encargado del sistema.' // Comentario para la tabla
    });

    // Agregar claves foráneas
    await queryInterface.addConstraint('mnt_bienes', {
      fields: ['id_encargado'],
      type: 'foreign key',
      name: 'fk_mnt_bienes_id_encargado',
      references: {
        table: 'mnt_encargados', // Tabla referenciada
        field: 'id', // Columna referenciada
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    });
    await queryInterface.addConstraint('mnt_bienes', {
      fields: ['id_tipo'],
      type: 'foreign key',
      name: 'fk_mnt_bienes_id_tipo',
      references: {
        table: 'ctl_tipos', // Tabla referenciada
        field: 'id', // Columna referenciada
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('mnt_bienes');
  }
};