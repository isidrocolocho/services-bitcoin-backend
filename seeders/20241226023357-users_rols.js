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
    const userRolData = [
      { id:1,id_user:1, id_rol: 1, createdAt: new Date()},
      { id:2,id_user:2, id_rol: 2, createdAt: new Date()},
      { id:3,id_user:3, id_rol: 3, createdAt: new Date()},
    ];
    await queryInterface.bulkInsert('users_rols', userRolData, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkInsert('users_rols', null, {});
  }
};
