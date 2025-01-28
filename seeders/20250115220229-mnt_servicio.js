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
        id_encargado: 1,
        servicio: 'Desarrollo de Software',
        descripcion: 'Creación de aplicaciones personalizadas para negocios.',
        foto_servicio: 'url_a_foto_software.jpg',
        precio_servicio: 2500.00,
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_encargado: 1,
        servicio: 'Diseño Gráfico',
        descripcion: 'Servicios de diseño para marcas, logos y materiales publicitarios.',
        foto_servicio: 'url_a_foto_diseno.jpg',
        precio_servicio: 1200.00,
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_encargado: 1,
        servicio: 'Consultoría Empresarial',
        descripcion: 'Asesoramiento estratégico para mejorar procesos y productividad.',
        foto_servicio: 'url_a_foto_consultoria.jpg',
        precio_servicio: 3000.00,
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_encargado: 1,
        servicio: 'Marketing Digital',
        descripcion: 'Gestión de redes sociales y estrategias de posicionamiento online.',
        foto_servicio: 'url_a_foto_marketing.jpg',
        precio_servicio: 1800.00,
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_encargado: 1,
        servicio: 'Producción Audiovisual',
        descripcion: 'Creación de contenido multimedia para campañas publicitarias.',
        foto_servicio: 'url_a_foto_produccion.jpg',
        precio_servicio: 4000.00,
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
    await queryInterface.bulkDelete('mnt_servicios', null, {});
  }
};
