'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('mnt_horario_atenciones', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_medico: {
        type: Sequelize.INTEGER,
        references: {
          model: 'mnt_medicos', // Cambiar a la tabla correcta si es diferente
          key: 'id',
        },
        allowNull: false,
      },
      id_dia: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ctl_dias', // Cambiar a la tabla correcta si es diferente
          key: 'id',
        },
        allowNull: false,
      },
      hora_inicio: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      hora_fin: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        comment: 'Timestamp para eliminación suave (soft delete)'
      }
    },
    {
      comment: 'Tabla que almacena la información de los horarios de atencion medica del sistema.' // Comentario para la tabla
    });
    
    await queryInterface.addConstraint('mnt_horario_atenciones', {
      fields: ['id_medico'],
      type: 'foreign key',
      name: 'fk_mnt_horario_atenciones_id_medico',
      references: {
        table: 'mnt_medicos', // Tabla referenciada
        field: 'id', // Columna referenciada
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('mnt_horario_atenciones', {
      fields: ['id_dia'],
      type: 'foreign key',
      name: 'fk_mnt_horario_atenciones_id_dia',
      references: {
        table: 'ctl_dias', // Tabla referenciada
        field: 'id', // Columna referenciada
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('mnt_horario_atenciones');
  }
};