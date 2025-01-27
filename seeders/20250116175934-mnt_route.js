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

    const empresaRoutes = [
      {
        id_permission: 106, // Dashboard de empresa
        name: "dashboard_empresa",
        title: "Dashboard empresa",
        path: "dashboard",
        icon: "dashboard",
        description: "Panel administrador para empresas",
        orden: 1,
        id_ruta_padre: null,
        is_active: true,
        visible: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id_permission: 110, // Ver perfil (compartido con clientes)
        name: "ver_perfil",
        title: "Perfil",
        path: "perfil",
        icon: "user",
        description: "Perfil del empresa",
        orden: 2,
        id_ruta_padre: null,
        is_active: true,
        visible: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id_permission: 107, // Citas atendidas de empresa
        name: "citas_atendidas_empresa",
        title: "Citas Atendidas",
        path: "citas-atendidas",
        icon: "history",
        description: "Citas atendidas de empresas",
        orden: 3,
        id_ruta_padre: null,
        is_active: true,
        visible: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id_permission: 108, // Calificaciones de empresas
        name: "calificacion_empresa",
        title: "Calificaciones",
        path: "calificaciones",
        icon: "star",
        description: "Calificaciones de los empresas",
        orden: 4,
        id_ruta_padre: null,
        is_active: true,
        visible: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id_permission: 109, // Próximas citas de empresas
        name: "proxima_cita_empresa",
        title: "Próximas Citas",
        path: "proximas-citas",
        icon: "calendar-check",
        description: "Próximas citas de empresas",
        orden: 5,
        id_ruta_padre: null,
        is_active: true,
        visible: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ];

    const clienteRoutes = [
      {
        id_permission: 114, // clientes ven el calendario
        name: "calendario_cliente",
        title: "Calendario",
        path: "calendario",
        icon: "calendar",
        description: "Calendario de citas para clientes",
        orden: 1,
        id_ruta_padre: null,
        is_active: true,
        visible: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id_permission: 111, // Catálogo de empresas
        name: "catalogo_cliente_empresa",
        title: "Catálogo de empresas",
        path: "catalogo",
        icon: "list",
        description: "Catálogo de empresas para clientes",
        orden: 2,
        id_ruta_padre: null,
        is_active: true,
        visible: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id_permission: 113, // Citas anteriores de clientes
        name: "citas_anteriores_cliente",
        title: "Citas Anteriores",
        path: "citas-anteriores",
        icon: "history",
        description: "Citas anteriores de clientes",
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
        name: "crear_cita_cliente",
        title: "Crear Citas",
        path: "crear-citas",
        icon: "plus-circle",
        description: "Crear nuevas citas para clientes",
        orden: 4,
        id_ruta_padre: null,
        is_active: true,
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id_permission: 110, // Ver perfil (compartido con empresas)
        name: "ver_perfil",
        title: "Perfil",
        path: "perfil",
        icon: "user",
        description: "Perfil del cliente",
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
    await queryInterface.bulkInsert('mnt_routes', [...empresaRoutes, ...clienteRoutes], {});
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
