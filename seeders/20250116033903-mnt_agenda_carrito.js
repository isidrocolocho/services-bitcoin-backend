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
    await queryInterface.bulkInsert('mnt_agenda_carritos', [
      {
        id_encargado: 1,
        id_user: 2,
        id_estado_agenda: 1,
        fecha_hora_inicio: new Date('2025-01-20T10:00:00Z'),
        fecha_hora_fin: new Date('2025-01-20T10:30:00Z'),
        descripcion: 'Compra de productos para limpieza de hogar',
        conclusion: 'Cliente satisfecho con los productos seleccionados',
        id_estado_pago: 1,
        sub_total: 100.0,
        descuento: 10.0,
        total: 90.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_encargado: 2,
        id_user: 4,
        id_estado_agenda: 2,
        fecha_hora_inicio: new Date('2025-01-21T15:00:00Z'),
        fecha_hora_fin: new Date('2025-01-21T15:45:00Z'),
        descripcion: 'Asesoría para compra de herramientas de jardinería',
        conclusion: 'Se recomendó el kit básico de jardinería',
        id_estado_pago: 2,
        sub_total: 200.0,
        descuento: 20.0,
        total: 180.0,
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
    await queryInterface.bulkDelete('mnt_agenda_carritos', null, {});
  }
};
