const { mnt_tipo_registro } = require('../models/index');
const { request, response } = require('express');
const {
    notFoundResponse,
    conflictResponse,
} = require('../utils/responseUtils');
const { where,Op } = require('sequelize');

const getTipoRegistrosList = async (req = request, res = response) => {
    try {
        const tiposRegistro = await mnt_tipo_registro.findAll({
            where: {
                [Op.or]: [{ id: 2 }, { id: 3 }],
              },
            order: [["id", "ASC"]]
        });
        return res.status(200).json(tiposRegistro);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener los registros', error });
    }
};

const getTipoRegistroById = async (req = request, res = response) => {
    const id = req.params.id;
    try {
        const tipoRegistro = await mnt_tipo_registro.findByPk(id);
        if (!tipoRegistro) {
            return notFoundResponse(res, 'Tipo de registro no encontrado');
        }
        return res.status(200).json(tipoRegistro);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener el registro', error });
    }
};

const crearTipoRegistro = async (req = request, res = response) => {
    const { tipo_registro, descripcion } = req.body;
    try {
        const nuevoRegistro = await mnt_tipo_registro.create({
            tipo_registro,
            descripcion,
        });
        return res.status(201).json(nuevoRegistro);
    } catch (error) {
        return conflictResponse(res, 'No se pudo crear el tipo de registro', error);
    }
};

const updateTipoRegistro = async (req = request, res = response) => {
    const { tipo_registro, descripcion } = req.body;
    const id = req.params.id;

    try {
        const tipoRegistro = await mnt_tipo_registro.findByPk(id);
        if (!tipoRegistro) {
            return notFoundResponse(res, 'Tipo de registro no encontrado');
        }

        if (tipo_registro !== undefined) {
            tipoRegistro.tipo_registro = tipo_registro;
        }
        if (descripcion !== undefined) {
            tipoRegistro.descripcion = descripcion;
        }

        await tipoRegistro.save();
        return res.status(200).json(tipoRegistro);
    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar el registro', error });
    }
};

const deleteTipoRegistro = async (req = request, res = response) => {
    const id = req.params.id;

    try {
        const tipoRegistro = await mnt_tipo_registro.findByPk(id);
        if (!tipoRegistro) {
            return notFoundResponse(res, 'Tipo de registro no encontrado');
        }

        await tipoRegistro.destroy();
        return res.status(200).json({ message: 'Tipo de registro eliminado correctamente' });
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar el registro', error });
    }
};

module.exports = {
    getTipoRegistrosList,
    getTipoRegistroById,
    crearTipoRegistro,
    updateTipoRegistro,
    deleteTipoRegistro,
};
