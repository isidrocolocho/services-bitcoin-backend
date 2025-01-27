'use strict';
const bcrypt = require('bcrypt');
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

    // Obtener las contraseñas desde las variables de entorno o usar las predeterminadas
    const adminEmail = process.env.SEEDER_USER_ADMIN || 'admin@admin.com';
    const adminPassword = process.env.SEEDER_PASSWORD_ADMIN || '4dm1n123';
    const superAdminEmail = process.env.SEEDER_USER_SUPER_ADMIN || 'superadmin@admin.com';
    const superAdminPassword = process.env.SEEDER_PASSWORD_SUPER_ADMIN || '4dm1n123';

    // Encriptar las contraseñas
    const hashedAdminPassword = await bcrypt.hash(adminPassword, 10);
    const hashedSuperAdminPassword = await bcrypt.hash(superAdminPassword, 10);
    const hashedTesterPassword = await bcrypt.hash('Test123', 10);

    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        username: 'Super Administrador',
        email: superAdminEmail,
        password: hashedSuperAdminPassword,
        nombres: 'Super',
        apellido: 'Admin',
        foto_perfil: null,
        descripcion: 'Usuario con privilegios totales',
        token: null,
        is_active: true,
        numero_telefono: '555-0001',
        fecha_nacimiento: '1980-01-01',
        id_user_created: 1,
        id_tipo_registro: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        username: 'Administrador',
        email: adminEmail,
        password: hashedAdminPassword,
        nombres: 'Admin',
        apellido: 'User',
        foto_perfil: null,
        descripcion: 'Usuario administrador del sistema',
        token: null,
        is_active: true,
        numero_telefono: '555-0002',
        fecha_nacimiento: '1990-01-01',
        id_user_created: 1,
        id_tipo_registro:1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        username: 'Tester',
        email: 'test@test.com',
        password: hashedTesterPassword,
        nombres: 'Test',
        apellido: 'User',
        foto_perfil: null,
        descripcion: 'Usuario de prueba',
        token: null,
        is_active: true,
        numero_telefono: '555-0003',
        fecha_nacimiento: '2000-01-01',
        id_user_created: 1,
        id_tipo_registro: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        username: 'DoctorJohn',
        email: 'doctor.john@example.com',
        password: hashedTesterPassword,
        nombres: 'John',
        apellido: 'Doe',
        foto_perfil: null,
        descripcion: 'Médico general con experiencia en medicina interna',
        token: null,
        is_active: true,
        numero_telefono: '555-0004',
        fecha_nacimiento: '1985-06-15',
        id_user_created: 1,
        id_tipo_registro: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        username: 'DoctorJohn2',
        email: 'doctor2.john@example.com',
        password: hashedTesterPassword,
        nombres: 'Sidee',
        apellido: 'hon',
        foto_perfil: null,
        descripcion: 'Médico general con experiencia en medicina interna',
        token: null,
        is_active: true,
        numero_telefono: '5535-0004',
        fecha_nacimiento: '1985-06-15',
        id_user_created: 1,
        id_tipo_registro: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        username: 'PatientJane',
        email: 'patient.jane@example.com',
        password: hashedTesterPassword,
        nombres: 'Jane',
        apellido: 'Smith',
        foto_perfil: null,
        descripcion: 'Paciente con historial de consultas periódicas',
        token: null,
        is_active: true,
        numero_telefono: '555-0005',
        fecha_nacimiento: '1995-09-25',
        id_user_created: null,
        id_tipo_registro: 3,
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
    await queryInterface.bulkInsert('users', null, {});
  }
};
