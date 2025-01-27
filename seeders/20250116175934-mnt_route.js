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

    const medicoRoutes = [
      {
        id_permission: 106, // Dashboard de médico
        name: "dashboard_medico",
        title: "Dashboard Médico",
        path: "dashboard",
        icon: "dashboard",
        description: "Panel administrador para médicos",
        orden: 1,
        id_ruta_padre: null,
        is_active: true,
        visible: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id_permission: 110, // Ver perfil (compartido con pacientes)
        name: "ver_perfil",
        title: "Perfil",
        path: "perfil",
        icon: "user",
        description: "Perfil del médico",
        orden: 2,
        id_ruta_padre: null,
        is_active: true,
        visible: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id_permission: 107, // Citas atendidas de médico
        name: "citas_atendidas_medico",
        title: "Citas Atendidas",
        path: "citas-atendidas",
        icon: "history",
        description: "Citas atendidas de médicos",
        orden: 3,
        id_ruta_padre: null,
        is_active: true,
        visible: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id_permission: 108, // Calificaciones de médicos
        name: "calificacion_medico",
        title: "Calificaciones",
        path: "calificaciones",
        icon: "star",
        description: "Calificaciones de los médicos",
        orden: 4,
        id_ruta_padre: null,
        is_active: true,
        visible: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id_permission: 109, // Próximas citas de médicos
        name: "proxima_cita_medico",
        title: "Próximas Citas",
        path: "proximas-citas",
        icon: "calendar-check",
        description: "Próximas citas de médicos",
        orden: 5,
        id_ruta_padre: null,
        is_active: true,
        visible: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ];

    const pacienteRoutes = [
      {
        id_permission: 114, // Pacientes ven el calendario
        name: "calendario_paciente",
        title: "Calendario",
        path: "calendario",
        icon: "calendar",
        description: "Calendario de citas para pacientes",
        orden: 1,
        id_ruta_padre: null,
        is_active: true,
        visible: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id_permission: 111, // Catálogo de médicos
        name: "catalogo_paciente_medico",
        title: "Catálogo de Médicos",
        path: "catalogo",
        icon: "list",
        description: "Catálogo de médicos para pacientes",
        orden: 2,
        id_ruta_padre: null,
        is_active: true,
        visible: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id_permission: 113, // Citas anteriores de pacientes
        name: "citas_anteriores_paciente",
        title: "Citas Anteriores",
        path: "citas-anteriores",
        icon: "history",
        description: "Citas anteriores de pacientes",
        orden: 3,
        id_ruta_padre: null,
        is_active: true,
        visible: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id_permission: 112, // Crear cita
        name: "crear_cita_paciente",
        title: "Crear Citas",
        path: "crear-citas",
        icon: "plus-circle",
        description: "Crear nuevas citas para pacientes",
        orden: 4,
        id_ruta_padre: null,
        is_active: true,
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id_permission: 110, // Ver perfil (compartido con médicos)
        name: "ver_perfil",
        title: "Perfil",
        path: "perfil",
        icon: "user",
        description: "Perfil del paciente",
        orden: 5,
        id_ruta_padre: null,
        is_active: true,
        visible: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ];

    // Inserta las rutas en la base de datos
    await queryInterface.bulkInsert('mnt_routes', [...medicoRoutes, ...pacienteRoutes], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('mnt_routes', null, {});
  }
};
