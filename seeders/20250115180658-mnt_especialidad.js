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
    const especialidadesMedicas = [
      { especialidad: 'Cardiología', descripcion: 'Especialidad médica del corazón', is_active: true, createdAt: new Date() },
      { especialidad: 'Dermatología', descripcion: 'Tratamiento de enfermedades de la piel', is_active: true, createdAt: new Date() },
      { especialidad: 'Pediatría', descripcion: 'Cuidado de la salud de los niños', is_active: true, createdAt: new Date() },
      { especialidad: 'Ginecología', descripcion: 'Atención de la salud femenina', is_active: true, createdAt: new Date() },
      { especialidad: 'Neurología', descripcion: 'Estudio del sistema nervioso', is_active: true, createdAt: new Date() },
    ];

    await queryInterface.bulkInsert('mnt_especialidades', especialidadesMedicas, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('mnt_especialidades', null, {});
  }
};
