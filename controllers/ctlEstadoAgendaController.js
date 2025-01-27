const { ctl_estado_agenda } = require('../models/index');
const { request, response } = require('express');
const {
    notFoundResponse,
    conflictResponse,
} = require('../utils/responseUtils');

// Obtener todos los estados de agenda
const getEstadosAgendaList = async (req = request, res = response) => {
    try {
        const estados = await ctl_estado_agenda.findAll({
            order: [["id", "ASC"]] // Orden por ID ascendente
        });
        return res.status(200).json(estados);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener los estados de agenda', error });
    }
};

// Obtener un estado de agenda por ID
const getEstadoAgendaById = async (req = request, res = response) => {
    const id = req.params.id;
    try {
        const estado = await ctl_estado_agenda.findByPk(id);
        if (!estado) {
            return notFoundResponse(res, 'Estado de agenda no encontrado');
        }
        return res.status(200).json(estado);
    } catch (error) {
        return res.status(500).json({ message: 'Error al buscar el estado de agenda', error });
    }
};

// Crear un nuevo estado de agenda
const crearEstadoAgenda = async (req = request, res = response) => {
    const { estado, color } = req.body;
    try {
        const nuevoEstado = await ctl_estado_agenda.create({
            estado,
            color
        });
        return res.status(201).json(nuevoEstado);
    } catch (error) {
        if (error instanceof ValidationError) {
            return conflictResponse(res, 'Error de validación al crear el estado de agenda');
        }
        return res.status(500).json({ message: 'Error al crear el estado de agenda', error });
    }
};

// Actualizar un estado de agenda existente
const updateEstadoAgenda = async (req = request, res = response) => {
    const id = req.params.id;
    const { estado, color } = req.body;
    try {
        const estadoAgenda = await ctl_estado_agenda.findByPk(id);
        if (!estadoAgenda) {
            return notFoundResponse(res, 'Estado de agenda no encontrado');
        }
        if (estado !== undefined) estadoAgenda.estado = estado;
        if (color !== undefined) estadoAgenda.color = color;
        await estadoAgenda.save();
        return res.status(200).json(estadoAgenda);
    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar el estado de agenda', error });
    }
};

// Eliminar un estado de agenda (soft delete)
const deleteEstadoAgenda = async (req = request, res = response) => {
    const id = req.params.id;
    try {
        const estadoAgenda = await ctl_estado_agenda.findByPk(id);
        if (!estadoAgenda) {
            return notFoundResponse(res, 'Estado de agenda no encontrado');
        }
        await estadoAgenda.destroy();
        return res.status(200).json({ message: 'Estado de agenda eliminado correctamente' });
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar el estado de agenda', error });
    }
};

module.exports = {
    getEstadosAgendaList,
    getEstadoAgendaById,
    crearEstadoAgenda,
    updateEstadoAgenda,
    deleteEstadoAgenda
};
