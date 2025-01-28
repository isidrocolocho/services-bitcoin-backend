const { mnt_bien, mnt_encargado, ctl_tipo } = require('../models/index');
const { request, response } = require('express');
const { notFoundResponse, conflictResponse } = require('../utils/responseUtils');
const { ValidationError } = require('sequelize');

// Obtener la lista de bienes
const getBienesList = async (req = request, res = response) => {
    try {
        const bienes = await mnt_bien.findAll({
            include: [
                { model: mnt_encargado, as: 'encargado' },
                { model: ctl_tipo, as: 'tipo' },
            ],
            order: [["id", "ASC"]],
        });
        return res.status(200).json(bienes);
    } catch (error) {
        console.error(error);
        return conflictResponse(res, 'Error al obtener la lista de bienes');
    }
};

// Obtener un bien por su ID
const getBienById = async (req = request, res = response) => {
    const id = req.params.id;
    try {
        const bien = await mnt_bien.findOne({
            where: { id: id },
            include: [
                { model: mnt_encargado, as: 'encargado' },
                { model: ctl_tipo, as: 'tipo' },
            ],
        });

        if (bien == null) {
            return notFoundResponse(res, 'Bien no encontrado');
        }
        return res.status(200).json(bien);
    } catch (error) {
        return conflictResponse(res, 'Error al obtener el bien');
    }
};

// Crear un nuevo bien
const crearBien = async (req = request, res = response) => {
    const { id_encargado, id_tipo, nombre, descripcion, foto, cantidad, precio } = req.body;
    try {
        const bienCreado = await mnt_bien.create({
            id_encargado,
            id_tipo,
            nombre,
            descripcion,
            foto,
            cantidad: id_tipo === 2 ? cantidad : null, // Solo asignar cantidad si es un producto
            precio,
        });
        return res.status(201).json(bienCreado);
    } catch (error) {
        if (error instanceof ValidationError) {
            return conflictResponse(res, 'Validación de datos fallida');
        }
        return conflictResponse(res, 'No se pudo crear el bien');
    }
};

// Actualizar información de un bien
const updateBien = async (req = request, res = response) => {
    const { id_encargado, id_tipo, nombre, descripcion, foto, cantidad, precio } = req.body;
    const id = req.params.id;

    const bienExistente = await mnt_bien.findByPk(id);
    if (bienExistente == null) {
        return notFoundResponse(res, 'Bien no encontrado');
    }

    // Actualizar campos si se proporcionan
    if (id_encargado !== undefined) bienExistente.id_encargado = id_encargado;
    if (id_tipo !== undefined) bienExistente.id_tipo = id_tipo;
    if (nombre !== undefined) bienExistente.nombre = nombre;
    if (descripcion !== undefined) bienExistente.descripcion = descripcion;
    if (foto !== undefined) bienExistente.foto = foto;
    if (precio !== undefined) bienExistente.precio = precio;

    // Actualizar cantidad solo si el bien es un producto
    if (id_tipo === 2 && cantidad !== undefined) {
        bienExistente.cantidad = cantidad;
    } else if (id_tipo === 1) {
        bienExistente.cantidad = null;
    }

    await bienExistente.save();
    return res.status(200).json(bienExistente);
};

// Eliminar un bien (soft delete)
const deleteBien = async (req = request, res = response) => {
    const id = req.params.id;
    const bien = await mnt_bien.findOne({
        where: { id: id },
    });

    if (bien == null) {
        return notFoundResponse(res, 'Bien no encontrado');
    }

    bien.is_active = false; // Marcar como inactivo
    await bien.save();
    return res.status(200).json({ message: 'Bien eliminado correctamente' });
};

// Activar un bien
const activarBien = async (req = request, res = response) => {
    const id = req.params.id;
    const bien = await mnt_bien.findOne({
        where: {
            id: id,
            is_active: false, // Solo buscar bienes inactivos
        },
    });

    if (bien == null) {
        return notFoundResponse(res, 'Bien no encontrado');
    }

    bien.is_active = true; // Marcar como activo
    await bien.save();
    return res.status(200).json({ message: 'Bien activado correctamente' });
};

module.exports = {
    getBienesList,
    getBienById,
    crearBien,
    updateBien,
    deleteBien,
    activarBien,
};
