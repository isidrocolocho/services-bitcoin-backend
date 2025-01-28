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
        comment: 'Primary key, auto-incremented',
      },
      id_encargado: {
        type: Sequelize.INTEGER,
        references: {
          model: 'mnt_encargados', // Cambiar a la tabla correcta si es diferente
          key: 'id',
        },
        allowNull: false,
        comment: 'ID del encargado asociado al empresa'
      },
      id_dia: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ctl_dias', // Cambiar a la tabla correcta si es diferente
          key: 'id',
        },
        allowNull: false,
        comment: 'ID del dia'
      },
      hora_inicio: {
        type: Sequelize.TIME,
        allowNull: false,
        comment: 'hora de inicio de horario'
      },
      hora_fin: {
        type: Sequelize.TIME,
        allowNull: false,
        comment: 'hora de fin de horario'
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
        comment: 'valida si es activo'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        comment: 'hora de creacion'
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        comment: 'hora de edicion'
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        comment: 'Timestamp para eliminación suave (soft delete)'
      }
    },
    {
      comment: 'Tabla que almacena la información de los horarios de atencion de la empresa del sistema.' // Comentario para la tabla
    });
    
    await queryInterface.addConstraint('mnt_horario_atenciones', {
      fields: ['id_encargado'],
      type: 'foreign key',
      name: 'fk_mnt_horario_atenciones_id_encargado',
      references: {
        table: 'mnt_encargados', // Tabla referenciada
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