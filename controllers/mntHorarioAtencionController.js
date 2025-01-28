const { mnt_horario_atencion, mnt_encargado, ctl_dia } = require('../models/index');
const { request, response } = require('express');
const { notFoundResponse, conflictResponse } = require('../utils/responseUtils');
const { ValidationError } = require('sequelize');

// Obtener la lista de horarios de atención
const getHorariosAtencionList = async (req = request, res = response) => {
    try {
        const horariosAtencion = await mnt_horario_atencion.findAll({
            include: [
                { model: mnt_encargado, as: 'encargado' },
                { model: ctl_dia, as: 'dia' },
            ],
            order: [["id", "ASC"]],
        });
        return res.status(200).json(horariosAtencion);
    } catch (error) {
        return conflictResponse(res, 'Error al obtener la lista de horarios de atención');
    }
};

// Obtener un horario de atención por su ID
const getHorarioAtencionById = async (req = request, res = response) => {
    const id = req.params.id;
    try {
        const horarioAtencion = await mnt_horario_atencion.findOne({
            where: {
                id: id,
            },
            include: [
                { model: mnt_encargado, as: 'encargado' },
                { model: ctl_dia, as: 'dia' },
            ],
        });

        if (horarioAtencion == null) {
            return notFoundResponse(res, 'Horario de atención no encontrado');
        }
        return res.status(200).json(horarioAtencion);
    } catch (error) {
        return conflictResponse(res, 'Error al obtener el horario de atención');
    }
};

// Crear un nuevo horario de atención
const crearHorarioAtencion = async (req = request, res = response) => {
    const { id_encargado, id_dia, hora_inicio, hora_fin } = req.body;
    try {
        const horarioAtencion = await mnt_horario_atencion.create({
            id_encargado,
            id_dia,
            hora_inicio,
            hora_fin,
        });
        return res.status(201).json(horarioAtencion);
    } catch (error) {
        return conflictResponse(res, 'No se pudo crear el horario de atención');
    }
};

// Actualizar información de un horario de atención
const updateHorarioAtencion = async (req = request, res = response) => {
    const { id_encargado, id_dia, hora_inicio, hora_fin } = req.body;
    const id = req.params.id;

    const horarioAtencion = await mnt_horario_atencion.findByPk(id);
    if (horarioAtencion == null) {
        return notFoundResponse(res, 'Horario de atención no encontrado');
    }

    // Actualizar campos si se proporcionan
    if (id_encargado !== undefined) {
        horarioAtencion.id_encargado = id_encargado;
    }
    if (id_dia !== undefined) {
        horarioAtencion.id_dia = id_dia;
    }
    if (hora_inicio !== undefined) {
        horarioAtencion.hora_inicio = hora_inicio;
    }
    if (hora_fin !== undefined) {
        horarioAtencion.hora_fin = hora_fin;
    }

    await horarioAtencion.save();
    return res.status(200).json(horarioAtencion);
};

// Eliminar un horario de atención (soft delete)
const deleteHorarioAtencion = async (req = request, res = response) => {
    const id = req.params.id;
    const horarioAtencion = await mnt_horario_atencion.findOne({
        where: {
            id: id,
        },
    });

    if (horarioAtencion == null) {
        return notFoundResponse(res, 'Horario de atención no encontrado');
    }

    // Cambiar el estado del horario de atención a inactivo (si fuera necesario en el futuro)
    horarioAtencion.is_active = false; // Si decides añadir un campo `is_active`
    await horarioAtencion.save();
    return res.status(200).json({ message: 'Horario de atención eliminado correctamente' });
};

// Activar un horario de atención
const activarHorarioAtencion = async (req = request, res = response) => {
    const id = req.params.id;
    const horarioAtencion = await mnt_horario_atencion.findOne({
        where: {
            id: id,
            is_active: false, // Si decides usar un campo `is_active`
        },
    });

    if (horarioAtencion == null) {
        return notFoundResponse(res, 'Horario de atención no encontrado');
    }

    // Cambiar el estado del horario de atención a activo
    horarioAtencion.is_active = true; // Si decides añadir un campo `is_active`
    await horarioAtencion.save();
    return res.status(200).json({ message: 'Horario de atención activado correctamente' });
};

module.exports = {
    getHorariosAtencionList,
    getHorarioAtencionById,
    crearHorarioAtencion,
    updateHorarioAtencion,
    deleteHorarioAtencion,
    activarHorarioAtencion,
};
