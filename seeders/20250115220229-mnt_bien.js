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
    await queryInterface.bulkInsert('mnt_bienes', [
      {
        id_encargado: 1,
        id_tipo: 1, // Servicio
        nombre: 'Desarrollo de Software',
        descripcion: 'Creación de aplicaciones personalizadas para negocios.',
        foto: 'url_a_foto_software.jpg',
        cantidad: null,
        precio: 2500.00,
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_encargado: 1,
        id_tipo: 1, // Servicio
        nombre: 'Diseño Gráfico',
        descripcion: 'Servicios de diseño para marcas, logos y materiales publicitarios.',
        foto: 'url_a_foto_diseno.jpg',
        cantidad: null,
        precio: 1200.00,
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_encargado: 1,
        id_tipo: 1, // Servicio
        nombre: 'Consultoría Empresarial',
        descripcion: 'Asesoramiento estratégico para mejorar procesos y productividad.',
        foto: 'url_a_foto_consultoria.jpg',
        cantidad: null,
        precio: 3000.00,
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_encargado: 1,
        id_tipo: 2, // Producto
        nombre: 'Laptop Profesional',
        descripcion: 'Computadora portátil de alto rendimiento.',
        foto: 'url_a_foto_laptop.jpg',
        cantidad: 50, // Solo para productos
        precio: 1500.00,
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_encargado: 1,
        id_tipo: 2, // Producto
        nombre: 'Mouse Inalámbrico',
        descripcion: 'Mouse ergonómico con conectividad Bluetooth.',
        foto: 'url_a_foto_mouse.jpg',
        cantidad: 200, // Solo para productos
        precio: 25.00,
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
    await queryInterface.bulkDelete('mnt_bienes', null, {});
  }
};
