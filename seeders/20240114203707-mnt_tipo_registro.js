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
    await queryInterface.bulkInsert('mnt_tipo_registros', [
      { id: 1, tipo_registro: 'Admin', descripcion: 'Admin', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, tipo_registro: 'Medico', descripcion: 'Medico del sistema', createdAt: new Date(), updatedAt: new Date() },
      { id: 3, tipo_registro: 'Paciente', descripcion: 'Paciente del sistema', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('mnt_tipo_registros', null, {});
  }
};
