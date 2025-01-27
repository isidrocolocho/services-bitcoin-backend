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
    await queryInterface.bulkInsert('mnt_servicios', [
      {
        id_medico: 1,
        servicio: 'Consulta general',
        descripcion: 'Consulta médica para diagnóstico general',
        foto_servicio: 'url_a_foto_servicio_1.jpg',
        precio_servicio: 150.00,
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_medico: 1,
        servicio: 'Consulta dental',
        descripcion: 'Consulta odontológica para limpieza y revisión',
        foto_servicio: 'url_a_foto_servicio_2.jpg',
        precio_servicio: 200.00,
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
    await queryInterface.bulkDelete('mnt_servicios', null, {});
  }
};
