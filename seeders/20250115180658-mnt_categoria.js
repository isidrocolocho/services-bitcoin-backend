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
    const categoriaEmpresas = [
      {
        categoria: 'Tecnología',
        descripcion: 'Empresas relacionadas con el desarrollo de software y hardware',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoria: 'Construcción',
        descripcion: 'Empresas dedicadas a la construcción de infraestructuras y edificios',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoria: 'Educación',
        descripcion: 'Instituciones y empresas dedicadas a la enseñanza y formación',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoria: 'Alimentación',
        descripcion: 'Empresas que ofrecen productos o servicios relacionados con alimentos',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoria: 'Entretenimiento',
        descripcion: 'Empresas que brindan servicios de ocio y recreación',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('mnt_categorias', categoriaEmpresas, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('mnt_categorias', null, {});
  }
};
