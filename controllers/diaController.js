const { ctl_dia } = require('../models/index');
const { request, response } = require('express');
const {
    notFoundResponse,
    conflictResponse,
} = require('../utils/responseUtils');

const { ValidationError, where } = require('sequelize');

const getDiasList = async (req = request, res = response) => {
    const dias = await ctl_dia.findAll({
        order: [["id", "ASC"]],
    });
    return res.status(200).json(dias);
};

const getDiaById = async (req = request, res = response) => {
    const id = req.params.id;
    const dia = await ctl_dia.findOne({
        where: { id },
    });
    if (dia == null) {
        return notFoundResponse(res, 'Día no encontrado');
    }
    return res.status(200).json(dia);
};

const crearDia = async (req = request, res = response) => {
    const { dia } = req.body;
    let nuevoDia;
    try {
        nuevoDia = await ctl_dia.create({
            dia,
        });
    } catch (error) {
        return conflictResponse(res, 'No se pudo crear el día');
    }
    return res.status(201).json(nuevoDia);
};

const updateDia = async (req = request, res = response) => {
    const { dia } = req.body;
    const id = req.params.id;
    const diaExistente = await ctl_dia.findByPk(id);
    if (diaExistente == null) {
        return notFoundResponse(res, 'El día que busca no fue encontrado');
    }
    if (dia !== undefined) {
        diaExistente.dia = dia;
    }
    await diaExistente.save();
    return res.status(200).json(diaExistente);
};

const deleteDia = async (req = request, res = response) => {
    const id = req.params.id;
    const dia = await ctl_dia.findByPk(id);
    if (dia == null) {
        return notFoundResponse(res, 'Día no encontrado');
    }
    await dia.destroy();
    return res.status(200).json({ message: 'Día eliminado correctamente' });
};

module.exports = {
    getDiasList,
    getDiaById,
    crearDia,
    updateDia,
    deleteDia,
};
