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
    await queryInterface.bulkInsert("ctl_estado_agendas", [
      {
        estado: "Agendada",
        color: "#FFD700", // Amarillo
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        estado: "En proceso",
        color: "#1E90FF", // Azul
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        estado: "Finalizada",
        color: "#32CD32", // Verde
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        estado: "Ocupada",
        color: "#324323", 
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
    await queryInterface.bulkDelete("ctl_estado_agendas", null, {});
  }
};
