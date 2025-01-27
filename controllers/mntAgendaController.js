const { mnt_agenda_medica, mnt_medico, user, ctl_estado_agenda, ctl_estado_pago } = require('../models/index');
const { request, response } = require('express');
const { notFoundResponse, conflictResponse } = require('../utils/responseUtils');

// Obtener la lista de agendas médicas
const getAgendasList = async (req = request, res = response) => {
    try {
        const agendas = await mnt_agenda_medica.findAll({
            include: [
                { model: mnt_medico, as: 'medico' },
                { model: user, as: 'user' }, // Cambiar 'user' a 'user'
                { model: ctl_estado_agenda, as: 'estadoAgenda' },
                { model: ctl_estado_pago, as: 'estadoPago' },
            ],
            order: [["fecha_hora_consulta", "ASC"]],
        });
        return res.status(200).json(agendas);
    } catch (error) {
        console.log(error)
        return conflictResponse(res, 'Error al obtener la lista de agendas médicas');
    }
};

// Obtener una agenda médica por su ID
const getAgendaById = async (req = request, res = response) => {
    const id = req.params.id;
    try {
        const agenda = await mnt_agenda_medica.findOne({
            where: { id },
            include: [
                { model: mnt_medico, as: 'medico' },
                { model: user, as: 'user' },
                { model: ctl_estado_agenda, as: 'estadoAgenda' },
                { model: ctl_estado_pago, as: 'estadoPago' },
            ],
        });

        if (!agenda) {
            return notFoundResponse(res, 'Agenda médica no encontrada');
        }
        return res.status(200).json(agenda);
    } catch (error) {
        return conflictResponse(res, 'Error al obtener la agenda médica');
    }
};

// Crear una nueva agenda médica
const crearAgenda = async (req = request, res = response) => {
    const { id_medico, id_user, id_estado_agenda, fecha_hora_consulta, fecha_hora_fin, descripcion, diagnostico, receta, valoracion, comentario, id_estado_pago, sub_total, descuento, total } = req.body;

    try {
        const agenda = await mnt_agenda_medica.create({
            id_medico,
            id_user,
            id_estado_agenda,
            fecha_hora_consulta,
            fecha_hora_fin,
            descripcion,
            diagnostico,
            receta,
            valoracion,
            comentario,
            id_estado_pago,
            sub_total,
            descuento,
            total,
        });
        return res.status(201).json(agenda);
    } catch (error) {
        return conflictResponse(res, 'No se pudo crear la agenda médica');
    }
};

// Actualizar una agenda médica
const updateAgenda = async (req = request, res = response) => {
    const id = req.params.id;
    const { id_medico, id_user, id_estado_agenda, fecha_hora_consulta, fecha_hora_fin, descripcion, diagnostico, receta, valoracion, comentario, id_estado_pago, sub_total, descuento, total } = req.body;

    try {
        const agenda = await mnt_agenda_medica.findByPk(id);

        if (!agenda) {
            return notFoundResponse(res, 'Agenda médica no encontrada');
        }

        // Actualizar campos si se proporcionan
        Object.assign(agenda, {
            id_medico,
            id_user,
            id_estado_agenda,
            fecha_hora_consulta,
            fecha_hora_fin,
            descripcion,
            diagnostico,
            receta,
            valoracion,
            comentario,
            id_estado_pago,
            sub_total,
            descuento,
            total,
        });

        await agenda.save();
        return res.status(200).json(agenda);
    } catch (error) {
        return conflictResponse(res, 'Error al actualizar la agenda médica');
    }
};

// Eliminar una agenda médica (soft delete)
const deleteAgenda = async (req = request, res = response) => {
    const id = req.params.id;

    try {
        const agenda = await mnt_agenda_medica.findByPk(id);

        if (!agenda) {
            return notFoundResponse(res, 'Agenda médica no encontrada');
        }

        // Marcar como eliminada (soft delete)
        await agenda.destroy();
        return res.status(200).json({ message: 'Agenda médica eliminada correctamente' });
    } catch (error) {
        return conflictResponse(res, 'Error al eliminar la agenda médica');
    }
};

module.exports = {
    getAgendasList,
    getAgendaById,
    crearAgenda,
    updateAgenda,
    deleteAgenda,
};
