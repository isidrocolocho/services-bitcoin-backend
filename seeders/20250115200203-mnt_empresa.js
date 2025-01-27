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
    await queryInterface.bulkInsert('mnt_empresas', [
      {
        id: 1,
        nombre_empresa: 'Empresa de Ropa',
        descripcion: 'Ropa de referencia en la ciudad.',
        direccion: 'Av. Principal 123, Ciudad',
        ubicacion: 'Lat: 19.432608, Long: -99.133209',
        foto_empresa: 'http://example.com/imagen_hospital.jpg',
        is_active:true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        nombre_empresa: 'Empresa de Comida',
        descripcion: 'Comida con especialidad en emergencias.',
        direccion: 'Calle Norte 45, Ciudad',
        ubicacion: 'Lat: 19.505876, Long: -99.122314',
        foto_empresa: 'http://example.com/imagen_hospital_norte.jpg',
        is_active:true,
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
    await queryInterface.bulkDelete('mnt_empresas', null, {});
  }
};
