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
    const tipos = [
      { tipo: 'Servicio', createdAt: new Date(), updatedAt: new Date() },
      { tipo: 'Producto', createdAt: new Date(), updatedAt: new Date() },
    ];

    await queryInterface.bulkInsert('ctl_tipos', tipos, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('ctl_tipos', null, {});
  }
};
