'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('mnt_agenda_carritos', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        comment: 'Identificador único de la agenda y carrito',
      },
      id_encargado: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: 'Clave foránea que referencia al encargado en la tabla mnt_encargados',
      },
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: 'Clave foránea que referencia al usuario en la tabla users',
      },
      id_estado_agenda: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: 'Clave foránea que referencia al estado de la agenda y carrito',
      },
      fecha_hora_inicio: {
        type: Sequelize.DATE,
        allowNull: false,
        comment: 'Fecha y hora de inicio de la consulta',
      },
      fecha_hora_fin: {
        type: Sequelize.DATE,
        allowNull: false,
        comment: 'Fecha y hora de finalización de la consulta',
      },
      descripcion: {
        type: Sequelize.STRING(500),
        allowNull: true,
        comment: 'Descripción breve de la consulta',
      },
      conclusion: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: 'Conclusion y carrito proporcionada al',
      },
      id_estado_pago: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: 'Clave foránea que referencia el estado de pago de la consulta',
      },
      sub_total: {
        type: Sequelize.FLOAT,
        allowNull: false,
        comment: 'Subtotal calculado de la consulta',
      },
      descuento: {
        type: Sequelize.FLOAT,
        allowNull: true,
        comment: 'Descuento aplicado a la consulta',
      },
      total: {
        type: Sequelize.FLOAT,
        allowNull: false,
        comment: 'Monto total a pagar por la consulta',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        comment: 'Timestamp de creación del registro',
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        comment: 'Timestamp de la última actualización del registro',
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        comment: 'Timestamp para eliminación suave (soft delete)',
      },
    },
    {
      comment: 'Tabla que almacena los la agenda y carrito de todos los encargados',
    });

    // Agregar las restricciones de claves foráneas
    await queryInterface.addConstraint('mnt_agenda_carritos', {
      fields: ['id_encargado'],
      type: 'foreign key',
      name: 'fk_mnt_agenda_carritos_id_encargado',
      references: {
        table: 'mnt_encargados',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('mnt_agenda_carritos', {
      fields: ['id_user'],
      type: 'foreign key',
      name: 'fk_mnt_agenda_carritos_id_user',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('mnt_agenda_carritos', {
      fields: ['id_estado_agenda'],
      type: 'foreign key',
      name: 'fk_mnt_agenda_carritos_id_estado_agenda',
      references: {
        table: 'ctl_estado_agendas',
        field: 'id',
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('mnt_agenda_carritos', {
      fields: ['id_estado_pago'],
      type: 'foreign key',
      name: 'fk_mnt_agenda_carritos_id_estado_pago',
      references: {
        table: 'ctl_estado_pagos',
        field: 'id',
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('mnt_agenda_carritos');
  }
};