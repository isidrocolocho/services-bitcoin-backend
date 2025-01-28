const { mnt_servicio, mnt_encargado } = require('../models/index');
const { request, response } = require('express');
const { notFoundResponse, conflictResponse } = require('../utils/responseUtils');
const { ValidationError } = require('sequelize');

// Obtener la lista de servicios encargados
const getServiciosList = async (req = request, res = response) => {
    try {
        const servicios = await mnt_servicio.findAll({
            include: [
                { model: mnt_encargado, as: 'encargado' }, // Incluir encargado relacionado
            ],
            order: [["id", "ASC"]],
        });
        return res.status(200).json(servicios);
    } catch (error) {
        console.log(error)
        return conflictResponse(res, 'Error al obtener la lista de servicios');
    }
};

// Obtener un servicio encargado por su ID
const getServicioById = async (req = request, res = response) => {
    const id = req.params.id;
    try {
        const servicio = await mnt_servicio.findOne({
            where: { id: id },
            include: [
                { model: mnt_encargado, as: 'encargado' },
            ],
        });

        if (servicio == null) {
            return notFoundResponse(res, 'Servicio no encontrado');
        }
        return res.status(200).json(servicio);
    } catch (error) {
        return conflictResponse(res, 'Error al obtener el servicio');
    }
};

// Crear un nuevo servicio encargado
const crearServicio = async (req = request, res = response) => {
    const { id_encargado, servicio, descripcion, foto_servicio, precio_servicio } = req.body;
    try {
        const servicioCreado = await mnt_servicio.create({
            id_encargado,
            servicio,
            descripcion,
            foto_servicio,
            precio_servicio,
        });
        return res.status(201).json(servicioCreado);
    } catch (error) {
        if (error instanceof ValidationError) {
            return conflictResponse(res, 'Validación de datos fallida');
        }
        return conflictResponse(res, 'No se pudo crear el servicio');
    }
};

// Actualizar información de un servicio encargado
const updateServicio = async (req = request, res = response) => {
    const { id_encargado, servicio, descripcion, foto_servicio, precio_servicio } = req.body;
    const id = req.params.id;

    const servicioExistente = await mnt_servicio.findByPk(id);
    if (servicioExistente == null) {
        return notFoundResponse(res, 'Servicio no encontrado');
    }

    // Actualizar campos si se proporcionan
    if (id_encargado !== undefined) servicioExistente.id_encargado = id_encargado;
    if (servicio !== undefined) servicioExistente.servicio = servicio;
    if (descripcion !== undefined) servicioExistente.descripcion = descripcion;
    if (foto_servicio !== undefined) servicioExistente.foto_servicio = foto_servicio;
    if (precio_servicio !== undefined) servicioExistente.precio_servicio = precio_servicio;

    await servicioExistente.save();
    return res.status(200).json(servicioExistente);
};

// Eliminar un servicio encargado (soft delete)
const deleteServicio = async (req = request, res = response) => {
    const id = req.params.id;
    const servicio = await mnt_servicio.findOne({
        where: { id: id },
    });

    if (servicio == null) {
        return notFoundResponse(res, 'Servicio no encontrado');
    }

    // Cambiar el estado del servicio a inactivo (si fuera necesario en el futuro)
    servicio.is_active = false; // Si decides añadir un campo `is_active`
    await servicio.save();
    return res.status(200).json({ message: 'Servicio eliminado correctamente' });
};

// Activar un servicio encargado
const activarServicio = async (req = request, res = response) => {
    const id = req.params.id;
    const servicio = await mnt_servicio.findOne({
        where: {
            id: id,
            is_active: false, // Si decides usar un campo `is_active`
        },
    });

    if (servicio == null) {
        return notFoundResponse(res, 'Servicio no encontrado');
    }

    // Cambiar el estado del servicio a activo
    servicio.is_active = true; // Si decides añadir un campo `is_active`
    await servicio.save();
    return res.status(200).json({ message: 'Servicio activado correctamente' });
};

module.exports = {
    getServiciosList,
    getServicioById,
    crearServicio,
    updateServicio,
    deleteServicio,
    activarServicio,
};
