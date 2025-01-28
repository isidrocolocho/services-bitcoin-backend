const { mnt_agenda_carrito, mnt_bienes, user, ctl_estado_agenda, ctl_estado_pago } = require('../models/index');
const { request, response } = require('express');
const { notFoundResponse, conflictResponse } = require('../utils/responseUtils');

// Obtener la lista de agendas del carrito
const getAgendasList = async (req = request, res = response) => {
    try {
        const agendas = await mnt_agenda_carrito.findAll({
            include: [
                { model: mnt_bienes, as: 'bien' },
                { model: user, as: 'usuario' },
                { model: ctl_estado_agenda, as: 'estadoAgenda' },
                { model: ctl_estado_pago, as: 'estadoPago' },
            ],
            order: [["fecha_hora_inicio", "ASC"]],
        });
        return res.status(200).json(agendas);
    } catch (error) {
        console.error(error);
        return conflictResponse(res, 'Error al obtener la lista de agendas');
    }
};

// Obtener una agenda por su ID
const getAgendaById = async (req = request, res = response) => {
    const id = req.params.id;
    try {
        const agenda = await mnt_agenda_carrito.findOne({
            where: { id },
            include: [
                { model: mnt_bienes, as: 'bien' },
                { model: user, as: 'usuario' },
                { model: ctl_estado_agenda, as: 'estadoAgenda' },
                { model: ctl_estado_pago, as: 'estadoPago' },
            ],
        });

        if (!agenda) {
            return notFoundResponse(res, 'Agenda no encontrada');
        }
        return res.status(200).json(agenda);
    } catch (error) {
        console.error(error);
        return conflictResponse(res, 'Error al obtener la agenda');
    }
};

// Crear una nueva agenda
const crearAgenda = async (req = request, res = response) => {
    const { id_bien, id_user, id_estado_agenda, fecha_hora_inicio, fecha_hora_fin, descripcion, conclucion, id_estado_pago, sub_total, descuento, total } = req.body;

    try {
        const agenda = await mnt_agenda_carrito.create({
            id_bien,
            id_user,
            id_estado_agenda,
            fecha_hora_inicio,
            fecha_hora_fin,
            descripcion,
            conclucion,
            id_estado_pago,
            sub_total,
            descuento,
            total,
        });
        return res.status(201).json(agenda);
    } catch (error) {
        console.error(error);
        return conflictResponse(res, 'No se pudo crear la agenda');
    }
};

// Actualizar una agenda
const updateAgenda = async (req = request, res = response) => {
    const id = req.params.id;
    const { id_bien, id_user, id_estado_agenda, fecha_hora_inicio, fecha_hora_fin, descripcion, conclucion, id_estado_pago, sub_total, descuento, total } = req.body;

    try {
        const agenda = await mnt_agenda_carrito.findByPk(id);

        if (!agenda) {
            return notFoundResponse(res, 'Agenda no encontrada');
        }

        // Actualizar campos si se proporcionan
        Object.assign(agenda, {
            id_bien,
            id_user,
            id_estado_agenda,
            fecha_hora_inicio,
            fecha_hora_fin,
            descripcion,
            conclucion,
            id_estado_pago,
            sub_total,
            descuento,
            total,
        });

        await agenda.save();
        return res.status(200).json(agenda);
    } catch (error) {
        console.error(error);
        return conflictResponse(res, 'Error al actualizar la agenda');
    }
};

// Eliminar una agenda (soft delete)
const deleteAgenda = async (req = request, res = response) => {
    const id = req.params.id;

    try {
        const agenda = await mnt_agenda_carrito.findByPk(id);

        if (!agenda) {
            return notFoundResponse(res, 'Agenda no encontrada');
        }

        // Marcar como eliminada (soft delete)
        await agenda.destroy();
        return res.status(200).json({ message: 'Agenda eliminada correctamente' });
    } catch (error) {
        console.error(error);
        return conflictResponse(res, 'Error al eliminar la agenda');
    }
};

module.exports = {
    getAgendasList,
    getAgendaById,
    crearAgenda,
    updateAgenda,
    deleteAgenda,
};
