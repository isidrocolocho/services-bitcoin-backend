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
        nombre_empresa: 'Tech Solutions',
        descripcion: 'Empresa dedicada al desarrollo de software y soluciones tecnológicas.',
        direccion: 'Av. Innovación 456, Ciudad',
        ubicacion: 'Lat: 19.432608, Long: -99.133209',
        foto_empresa: 'http://example.com/imagen_tech_solutions.jpg',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        nombre_empresa: 'Constructora Ideal',
        descripcion: 'Expertos en construcción de infraestructuras modernas.',
        direccion: 'Calle Progreso 789, Ciudad',
        ubicacion: 'Lat: 19.505876, Long: -99.122314',
        foto_empresa: 'http://example.com/imagen_constructora_ideal.jpg',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        nombre_empresa: 'Academia Futuro',
        descripcion: 'Institución educativa con programas innovadores.',
        direccion: 'Boulevard del Saber 321, Ciudad',
        ubicacion: 'Lat: 19.420500, Long: -99.150000',
        foto_empresa: 'http://example.com/imagen_academia_futuro.jpg',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        nombre_empresa: 'Sabor y Tradición',
        descripcion: 'Restaurante especializado en comida tradicional.',
        direccion: 'Calle Gourmet 101, Ciudad',
        ubicacion: 'Lat: 19.450000, Long: -99.120000',
        foto_empresa: 'http://example.com/imagen_sabor_tradicion.jpg',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        nombre_empresa: 'Diversión Total',
        descripcion: 'Centro de entretenimiento para todas las edades.',
        direccion: 'Av. Recreo 202, Ciudad',
        ubicacion: 'Lat: 19.470000, Long: -99.140000',
        foto_empresa: 'http://example.com/imagen_diversion_total.jpg',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
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
