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
    const days = [
      { dia: 'Lunes', createdAt: new Date(), updatedAt: new Date() },
      { dia: 'Martes', createdAt: new Date(), updatedAt: new Date() },
      { dia: 'Miércoles', createdAt: new Date(), updatedAt: new Date() },
      { dia: 'Jueves', createdAt: new Date(), updatedAt: new Date() },
      { dia: 'Viernes', createdAt: new Date(), updatedAt: new Date() },
      { dia: 'Sábado', createdAt: new Date(), updatedAt: new Date() },
      { dia: 'Domingo', createdAt: new Date(), updatedAt: new Date() },
    ];

    await queryInterface.bulkInsert('ctl_dias', days, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('ctl_dias', null, {});
  }
};
