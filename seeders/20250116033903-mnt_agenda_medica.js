'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('mnt_agenda_medicas', [
      {
        id_medico: 1,
        id_user: 2,
        id_estado_agenda: 1,
        fecha_hora_consulta: new Date('2025-01-20T10:00:00Z'),
        fecha_hora_fin: new Date('2025-01-20T10:30:00Z'),
        descripcion: 'Consulta general sobre dolor de cabeza',
        diagnostico: 'Migraña crónica',
        receta: 'Paracetamol 500mg cada 8 horas',
        valoracion: 4.5,
        comentario: 'Buena atención',
        id_estado_pago: 1,
        sub_total: 50.0,
        descuento: 5.0,
        total: 45.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_medico: 2,
        id_user: 4,
        id_estado_agenda: 2,
        fecha_hora_consulta: new Date('2025-01-21T15:00:00Z'),
        fecha_hora_fin: new Date('2025-01-21T15:45:00Z'),
        descripcion: 'Control de presión arterial',
        diagnostico: 'Hipertensión leve',
        receta: 'Losartán 50mg al día',
        valoracion: 4.8,
        comentario: 'El médico fue muy amable',
        id_estado_pago: 2,
        sub_total: 60.0,
        descuento: 10.0,
        total: 50.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('mnt_agenda_medicas', null, {});
  }
};
