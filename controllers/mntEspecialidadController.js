const { mnt_especialidad } = require('../models/index');
const { request, response } = require('express');
const {
    notFoundResponse,
    conflictResponse,
} = require('../utils/responseUtils');

const { ValidationError, where } = require('sequelize');

// Obtener lista de especialidades
const getEspecialidadesList = async (req = request, res = response) => {
    const especialidades = await mnt_especialidad.findAll({
        where: {
            is_active: true
        },
        order: [["id", "ASC"]] // Ordenar por ID de manera ascendente
    });
    return res.status(200).json(especialidades);
};

// Obtener una especialidad por ID
const getEspecialidadById = async (req = request, res = response) => {
    const id = req.params.id;
    const especialidad = await mnt_especialidad.findOne({
        where: {
            id: id,
            is_active: true
        }
    });
    if (especialidad == null) {
        return notFoundResponse(res, 'Especialidad no encontrada');
    }
    return res.status(200).json(especialidad);
};

// Crear una nueva especialidad
const crearEspecialidad = async (req = request, res = response) => {
    const { especialidad, descripcion } = req.body;
    let nuevaEspecialidad;
    try {
        nuevaEspecialidad = await mnt_especialidad.create({
            especialidad,
            descripcion,
            is_active: true
        });
    } catch (error) {
        return conflictResponse(res, 'No se pudo crear la especialidad');
    }
    return res.status(201).json(nuevaEspecialidad);
};

// Actualizar una especialidad
const updateEspecialidad = async (req = request, res = response) => {
    const { especialidad, descripcion } = req.body;
    const id = req.params.id;
    const especialidadExistente = await mnt_especialidad.findByPk(id);
    if (especialidadExistente == null) {
        return notFoundResponse(res, 'La especialidad no fue encontrada');
    }
    // Validaciones
    if (especialidad !== undefined) {
        especialidadExistente.especialidad = especialidad;
    }
    if (descripcion !== undefined) {
        especialidadExistente.descripcion = descripcion;
    }
    await especialidadExistente.save();
    return res.status(200).json(especialidadExistente);
};

// Eliminar una especialidad (cambio de estado a inactivo)
const deleteEspecialidad = async (req = request, res = response) => {
    const id = req.params.id;
    const especialidad = await mnt_especialidad.findOne({
        where: {
            id: id,
            is_active: true
        }
    });
    if (especialidad == null) {
        return notFoundResponse(res, 'Especialidad no encontrada');
    }
    // Cambiar estado de la especialidad
    especialidad.is_active = false;
    await especialidad.save();
    return res.status(200).json({ mensaje: 'Especialidad eliminada correctamente' });
};

// Activar una especialidad
const activarEspecialidad = async (req = request, res = response) => {
    const id = req.params.id;
    const especialidad = await mnt_especialidad.findOne({
        where: {
            id: id,
            is_active: false
        }
    });
    if (especialidad == null) {
        return notFoundResponse(res, 'Especialidad no encontrada');
    }
    // Cambiar estado de la especialidad
    especialidad.is_active = true;
    await especialidad.save();
    return res.status(200).json({ mensaje: 'Especialidad activada correctamente' });
};

module.exports = {
    getEspecialidadesList,
    getEspecialidadById,
    crearEspecialidad,
    updateEspecialidad,
    deleteEspecialidad,
    activarEspecialidad
};
