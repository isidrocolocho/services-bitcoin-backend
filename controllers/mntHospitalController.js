const { mnt_hospital } = require('../models/index');
const { request, response } = require('express');
const {
    notFoundResponse,
    conflictResponse,
} = require('../utils/responseUtils');

const { ValidationError, where } = require('sequelize');

// Obtener lista de hospitales activos
const getHospitalesList = async (req = request, res = response) => {
    const hospitales = await mnt_hospital.findAll({
        where: {
            is_active: true
        },
        order: [["id", "ASC"]]
    });
    return res.status(200).json(hospitales);
};

// Obtener hospital por ID
const getHospitalById = async (req = request, res = response) => {
    const id = req.params.id;
    const hospital = await mnt_hospital.findOne({
        where: {
            id: id,
            is_active: true
        }
    });
    if (hospital == null) {
        return notFoundResponse(res, 'Hospital no encontrado');
    }
    return res.status(200).json(hospital);
};

// Crear un nuevo hospital
const crearHospital = async (req = request, res = response) => {
    const { nombre_hospital, descripcion, direccion, ubicacion, foto_hospital } = req.body;
    let hospital;
    try {
        hospital = await mnt_hospital.create({
            nombre_hospital,
            descripcion,
            direccion,
            ubicacion,
            foto_hospital
        });
    } catch (error) {
        return conflictResponse(res, 'No se pudo crear el hospital');
    }
    return res.status(201).json(hospital);
};

// Actualizar un hospital
const updateHospital = async (req = request, res = response) => {
    const { nombre_hospital, descripcion, direccion, ubicacion, foto_hospital } = req.body;
    const id = req.params.id;
    const hospital = await mnt_hospital.findByPk(id);
    if (hospital == null) {
        return notFoundResponse(res, 'El hospital que busca no fue encontrado');
    }

    // Validaciones y actualizaciones
    if (nombre_hospital !== undefined) {
        hospital.nombre_hospital = nombre_hospital;
    }
    if (descripcion !== undefined) {
        hospital.descripcion = descripcion;
    }
    if (direccion !== undefined) {
        hospital.direccion = direccion;
    }
    if (ubicacion !== undefined) {
        hospital.ubicacion = ubicacion;
    }
    if (foto_hospital !== undefined) {
        hospital.foto_hospital = foto_hospital;
    }

    await hospital.save();
    return res.status(200).json(hospital);
};

// Eliminar un hospital (cambiar estado a inactivo)
const deleteHospital = async (req = request, res = response) => {
    const id = req.params.id;
    const hospital = await mnt_hospital.findOne({
        where: {
            id: id,
            is_active: true
        }
    });
    if (hospital == null) {
        return notFoundResponse(res, 'Hospital no encontrado');
    }
    
    // Cambiar el estado a inactivo
    hospital.is_active = false;
    await hospital.save();
    return res.status(200).json({ message: 'Hospital eliminado correctamente' });
};

// Activar un hospital
const activarHospital = async (req = request, res = response) => {
    const id = req.params.id;
    const hospital = await mnt_hospital.findOne({
        where: {
            id: id,
            is_active: false
        }
    });
    if (hospital == null) {
        return notFoundResponse(res, 'Hospital no encontrado');
    }

    // Cambiar el estado a activo
    hospital.is_active = true;
    await hospital.save();
    return res.status(200).json({ message: 'Hospital activado correctamente' });
};

module.exports = {
    getHospitalesList,
    getHospitalById,
    crearHospital,
    updateHospital,
    deleteHospital,
    activarHospital
};
