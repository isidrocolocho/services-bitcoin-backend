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
    await queryInterface.bulkInsert('mnt_medicos', [
      {
        id_user: 4,
        id_especialidad: 1,
        id_hospital: 1,
        numero_junta: 'JUNTA001',
        precio_consulta: 200.00,
        tiempo_consulta: 30,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_user: 5,
        id_especialidad: 2,
        id_hospital: 2,
        numero_junta: 'JUNTA002',
        precio_consulta: 250.00,
        tiempo_consulta: 45,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('mnt_medicos', null, {});
  }
};
