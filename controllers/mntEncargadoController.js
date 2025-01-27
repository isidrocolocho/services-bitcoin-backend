const { mnt_encargado, user, mnt_categoria, mnt_empresa } = require('../models/index');
const { request, response } = require('express');
const { notFoundResponse, conflictResponse } = require('../utils/responseUtils');
const { ValidationError } = require('sequelize');

// Obtener la lista de encargado
const getEncargadoList = async (req = request, res = response) => {
    try {
        const encargados = await mnt_encargado.findAll({
            where: {
                is_active: true, // Suponiendo que hay un campo is_active en la tabla
            },
            include: [
                { model: user, as: 'user' }, // Debe coincidir con el alias en belongsTo
                { model: mnt_categoria, as: 'categoria' },
                { model: mnt_empresa, as: 'empresa' },
            ],            
            order: [["id", "ASC"]],
        });
        console.log(encargados);
        
        return res.status(200).json(encargados);
    } catch (error) {
        console.log('error:',error)
        return conflictResponse(res, 'Error al obtener la lista de encargado', error);
    }
};

// Obtener un Encargado por su ID
const getEncargadoById = async (req = request, res = response) => {
    const id = req.params.id;
    try {
        const encargado = await mnt_encargado.findOne({
            where: {
                id: id,
                is_active: true,
            },
            include: [
                { model: user, as: 'user' },
                { model: mnt_categoria, as: 'categoria' },
                { model: mnt_empresa, as: 'empresa' },
            ],
        });

        if (encargado == null) {
            return notFoundResponse(res, 'Encargado no encontrado');
        }
        return res.status(200).json(encargado);
    } catch (error) {
        return conflictResponse(res, 'Error al obtener el Encargado');
    }
};

// Crear un nuevo Encargado
const crearEncargado = async (req = request, res = response) => {
    const { id_user, id_categoria, id_empresa } = req.body;
    let encargado;
    try {
        encargado = await mnt_encargado.create({
            id_user,
            id_categoria,
            id_empresa,
        });
        return res.status(201).json(encargado);
    } catch (error) {
        return conflictResponse(res, 'No se pudo crear el Encargado');
    }
};

// Actualizar información de un Encargado
const updateEncargado = async (req = request, res = response) => {
    const { id_user, id_categoria, id_empresa } = req.body;
    const id = req.params.id;

    const encargado = await mnt_encargado.findByPk(id);
    if (encargado == null) {
        return notFoundResponse(res, 'Encargado no encontrado');
    }

    // Actualizar campos si se proporcionan
    if (id_user !== undefined) {
        encargado.id_user = id_user;
    }
    if (id_categoria !== undefined) {
        encargado.id_categoria = id_categoria;
    }
    if (id_empresa !== undefined) {
        encargado.id_empresa = id_empresa;
    }

    await encargado.save();
    return res.status(200).json(encargado);
};

// Eliminar un Encargado (soft delete)
const deleteEncargado = async (req = request, res = response) => {
    const id = req.params.id;
    const encargado = await mnt_encargado.findOne({
        where: {
            id: id,
            is_active: true,
        },
    });

    if (encargado == null) {
        return notFoundResponse(res, 'Encargado no encontrado');
    }

    // Cambiar el estado del Encargado a inactivo
    encargado.is_active = false;
    await encargado.save();
    return res.status(200).json({ message: 'Encargado eliminado correctamente' });
};

// Activar un Encargado
const activarEncargado = async (req = request, res = response) => {
    const id = req.params.id;
    const encargado = await mnt_encargado.findOne({
        where: {
            id: id,
            is_active: false,
        },
    });

    if (encargado == null) {
        return notFoundResponse(res, 'Encargado no encontrado');
    }

    // Cambiar el estado del Encargado a activo
    encargado.is_active = true;
    await encargado.save();
    return res.status(200).json({ message: 'Encargado activado correctamente' });
};

module.exports = {
    getEncargadoList,
    getEncargadoById,
    crearEncargado,
    updateEncargado,
    deleteEncargado,
    activarEncargado,
};
