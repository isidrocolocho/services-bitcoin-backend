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
   const rolsData = [
    { id:1,rol:'SuperAdmin', description: 'Rol de Super Administrador Este rol es recomendado para el programador administrador del sistema', is_active:true, createdAt: new Date()},
    { id:2,rol:'Administrador', description: 'Rol de Administrador Este rol es recomendado para el administrador del sistema que no sea programador ', is_active:true, createdAt: new Date()},
    { id:3,rol:'Test', description: 'Rol para pruebas de permisos del sistema', is_active:true, createdAt: new Date()}, 
    { id:4,rol:'Medico', description: 'Rol para permisos de medicos', is_active:true, createdAt: new Date()}, 
    { id:5,rol:'Paciente', description: 'Rol para permisos de pacientes', is_active:true, createdAt: new Date()}, 
   ];
   await queryInterface.bulkInsert('rols', rolsData, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkInsert('rols', null, {});
  }
};
