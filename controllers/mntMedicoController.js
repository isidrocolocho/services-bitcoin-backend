const { mnt_medico, user, mnt_especialidad, mnt_hospital } = require('../models/index');
const { request, response } = require('express');
const { notFoundResponse, conflictResponse } = require('../utils/responseUtils');
const { ValidationError } = require('sequelize');

// Obtener la lista de médicos
const getMedicosList = async (req = request, res = response) => {
    try {
        const medicos = await mnt_medico.findAll({
            where: {
                is_active: true, // Suponiendo que hay un campo is_active en la tabla
            },
            include: [
                { model: user, as: 'user' }, // Debe coincidir con el alias en belongsTo
                { model: mnt_especialidad, as: 'especialidad' },
                { model: mnt_hospital, as: 'hospital' },
            ],            
            order: [["id", "ASC"]],
        });
        console.log(medicos);
        
        return res.status(200).json(medicos);
    } catch (error) {
        console.log('error:',error)
        return conflictResponse(res, 'Error al obtener la lista de médicos', error);
    }
};

// Obtener un médico por su ID
const getMedicoById = async (req = request, res = response) => {
    const id = req.params.id;
    try {
        const medico = await mnt_medico.findOne({
            where: {
                id: id,
                is_active: true,
            },
            include: [
                { model: user, as: 'user' },
                { model: mnt_especialidad, as: 'especialidad' },
                { model: mnt_hospital, as: 'hospital' },
            ],
        });

        if (medico == null) {
            return notFoundResponse(res, 'Médico no encontrado');
        }
        return res.status(200).json(medico);
    } catch (error) {
        return conflictResponse(res, 'Error al obtener el médico');
    }
};

// Crear un nuevo médico
const crearMedico = async (req = request, res = response) => {
    const { id_user, id_especialidad, id_hospital, numero_junta, precio_consulta, tiempo_consulta } = req.body;
    let medico;
    try {
        medico = await mnt_medico.create({
            id_user,
            id_especialidad,
            id_hospital,
            numero_junta,
            precio_consulta,
            tiempo_consulta,
        });
        return res.status(201).json(medico);
    } catch (error) {
        return conflictResponse(res, 'No se pudo crear el médico');
    }
};

// Actualizar información de un médico
const updateMedico = async (req = request, res = response) => {
    const { id_user, id_especialidad, id_hospital, numero_junta, precio_consulta, tiempo_consulta } = req.body;
    const id = req.params.id;

    const medico = await mnt_medico.findByPk(id);
    if (medico == null) {
        return notFoundResponse(res, 'Médico no encontrado');
    }

    // Actualizar campos si se proporcionan
    if (id_user !== undefined) {
        medico.id_user = id_user;
    }
    if (id_especialidad !== undefined) {
        medico.id_especialidad = id_especialidad;
    }
    if (id_hospital !== undefined) {
        medico.id_hospital = id_hospital;
    }
    if (numero_junta !== undefined) {
        medico.numero_junta = numero_junta;
    }
    if (precio_consulta !== undefined) {
        medico.precio_consulta = precio_consulta;
    }
    if (tiempo_consulta !== undefined) {
        medico.tiempo_consulta = tiempo_consulta;
    }

    await medico.save();
    return res.status(200).json(medico);
};

// Eliminar un médico (soft delete)
const deleteMedico = async (req = request, res = response) => {
    const id = req.params.id;
    const medico = await mnt_medico.findOne({
        where: {
            id: id,
            is_active: true,
        },
    });

    if (medico == null) {
        return notFoundResponse(res, 'Médico no encontrado');
    }

    // Cambiar el estado del médico a inactivo
    medico.is_active = false;
    await medico.save();
    return res.status(200).json({ message: 'Médico eliminado correctamente' });
};

// Activar un médico
const activarMedico = async (req = request, res = response) => {
    const id = req.params.id;
    const medico = await mnt_medico.findOne({
        where: {
            id: id,
            is_active: false,
        },
    });

    if (medico == null) {
        return notFoundResponse(res, 'Médico no encontrado');
    }

    // Cambiar el estado del médico a activo
    medico.is_active = true;
    await medico.save();
    return res.status(200).json({ message: 'Médico activado correctamente' });
};

module.exports = {
    getMedicosList,
    getMedicoById,
    crearMedico,
    updateMedico,
    deleteMedico,
    activarMedico,
};
