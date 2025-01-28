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
    await queryInterface.bulkInsert('mnt_horario_atenciones', [
      {
        id_encargado: 1, // Asegúrate de que los IDs de los encargado existan
        id_dia: 1, // Asegúrate de que los IDs de los días existan
        hora_inicio: '08:00:00',
        hora_fin: '12:00:00',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_encargado: 1,
        id_dia: 2,
        hora_inicio: '14:00:00',
        hora_fin: '18:00:00',
        is_active: true,
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
    await queryInterface.bulkDelete('mnt_horario_atenciones', null, {});
  }
};
