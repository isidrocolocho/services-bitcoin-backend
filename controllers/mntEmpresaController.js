const { mnt_empresa } = require('../models/index');
const { request, response } = require('express');
const {
    notFoundResponse,
    conflictResponse,
} = require('../utils/responseUtils');

const { ValidationError, where } = require('sequelize');

// Obtener lista de empresa activos
const getEmpresaList = async (req = request, res = response) => {
    const empresa = await mnt_empresa.findAll({
        where: {
            is_active: true
        },
        order: [["id", "ASC"]]
    });
    return res.status(200).json(empresa);
};

// Obtener empresa por ID
const getEmpresaById = async (req = request, res = response) => {
    const id = req.params.id;
    const empresa = await mnt_empresa.findOne({
        where: {
            id: id,
            is_active: true
        }
    });
    if (empresa == null) {
        return notFoundResponse(res, 'Empresa no encontrado');
    }
    return res.status(200).json(empresa);
};

// Crear un nuevo empresa
const crearEmpresa = async (req = request, res = response) => {
    const { nombre_empresa, descripcion, direccion, ubicacion, foto_empresa } = req.body;
    let empresa;
    try {
        empresa = await mnt_empresa.create({
            nombre_empresa,
            descripcion,
            direccion,
            ubicacion,
            foto_empresa
        });
    } catch (error) {
        return conflictResponse(res, 'No se pudo crear el empresa');
    }
    return res.status(201).json(empresa);
};

// Actualizar un empresa
const updateEmpresa = async (req = request, res = response) => {
    const { nombre_empresa, descripcion, direccion, ubicacion, foto_empresa } = req.body;
    const id = req.params.id;
    const empresa = await mnt_empresa.findByPk(id);
    if (empresa == null) {
        return notFoundResponse(res, 'El empresa que busca no fue encontrado');
    }

    // Validaciones y actualizaciones
    if (nombre_empresa !== undefined) {
        empresa.nombre_empresa = nombre_empresa;
    }
    if (descripcion !== undefined) {
        empresa.descripcion = descripcion;
    }
    if (direccion !== undefined) {
        empresa.direccion = direccion;
    }
    if (ubicacion !== undefined) {
        empresa.ubicacion = ubicacion;
    }
    if (foto_empresa !== undefined) {
        empresa.foto_empresa = foto_empresa;
    }

    await empresa.save();
    return res.status(200).json(empresa);
};

// Eliminar un empresa (cambiar estado a inactivo)
const deleteEmpresa = async (req = request, res = response) => {
    const id = req.params.id;
    const empresa = await mnt_empresa.findOne({
        where: {
            id: id,
            is_active: true
        }
    });
    if (empresa == null) {
        return notFoundResponse(res, 'Empresa no encontrado');
    }
    
    // Cambiar el estado a inactivo
    empresa.is_active = false;
    await empresa.save();
    return res.status(200).json({ message: 'Empresa eliminado correctamente' });
};

// Activar un empresa
const activarEmpresa = async (req = request, res = response) => {
    const id = req.params.id;
    const empresa = await mnt_empresa.findOne({
        where: {
            id: id,
            is_active: false
        }
    });
    if (empresa == null) {
        return notFoundResponse(res, 'Empresa no encontrado');
    }

    // Cambiar el estado a activo
    empresa.is_active = true;
    await empresa.save();
    return res.status(200).json({ message: 'Empresa activado correctamente' });
};

module.exports = {
    getEmpresaList,
    getEmpresaById,
    crearEmpresa,
    updateEmpresa,
    deleteEmpresa,
    activarEmpresa
};
