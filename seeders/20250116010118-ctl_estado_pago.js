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
    await queryInterface.bulkInsert('ctl_estado_pagos', [
      {
        estado_pago: 'Pendiente',
        color: '#FFA500',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        estado_pago: 'Pagado',
        color: '#008000',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        estado_pago: 'Finalizado',
        color: '#0000FF',
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
    await queryInterface.bulkDelete('ctl_estado_pagos', null, {});
  }
};
