'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('mnt_medicos', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        comment: 'Identificador único del médico'
      },
      id_user: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',  // Tabla referenciada
          key: 'id',  // Columna de referencia
        },
        allowNull: false,
        comment: 'ID del usuario asociado al médico'
      },
      id_especialidad: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        references: {
          model: 'mnt_especialidades', // Tabla referenciada
          key: 'id', // Columna de referencia
        },
        comment: 'ID de la especialidad del médico'
      },
      id_hospital: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        references: {
          model: 'mnt_hospitales', // Tabla referenciada
          key: 'id', // Columna de referencia
        },
        comment: 'ID del hospital asociado al médico'
      },
      numero_junta: {
        type: Sequelize.STRING(250), // Definido como varchar(250)
        allowNull: true,
        comment: 'Número de la junta médica'
      },
      precio_consulta: {
        type: Sequelize.FLOAT,
        allowNull: true,
        comment: 'Precio de la consulta médica'
      },
      tiempo_consulta: {
        type: Sequelize.INTEGER,
        allowNull: true,
        comment: 'Tiempo de duración de la consulta médica (en minutos)'
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        comment: 'Indicates if the medico is active'
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
    await queryInterface.addConstraint('mnt_medicos', {
      fields: ['id_user'],
      type: 'foreign key',
      name: 'fk_mnt_medicos_id_user',
      references: {
        table: 'users', // Tabla referenciada
        field: 'id', // Columna referenciada
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('mnt_medicos', {
      fields: ['id_especialidad'],
      type: 'foreign key',
      name: 'fk_mnt_medicos_id_especialidad',
      references: {
        table: 'mnt_especialidades', // Tabla referenciada
        field: 'id', // Columna referenciada
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('mnt_medicos', {
      fields: ['id_hospital'],
      type: 'foreign key',
      name: 'fk_mnt_medicos_id_hospital',
      references: {
        table: 'mnt_hospitales', // Tabla referenciada
        field: 'id', // Columna referenciada
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('mnt_medicos');
  }
};