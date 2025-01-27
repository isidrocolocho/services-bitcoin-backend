const { mnt_categoria } = require('../models/index');
const { request, response } = require('express');
const {
    notFoundResponse,
    conflictResponse,
} = require('../utils/responseUtils');

const { ValidationError, where } = require('sequelize');

// Obtener lista de categorias
const getCategoriasList = async (req = request, res = response) => {
    const categorias = await mnt_categoria.findAll({
        where: {
            is_active: true
        },
        order: [["id", "ASC"]] // Ordenar por ID de manera ascendente
    });
    return res.status(200).json(categorias);
};

// Obtener una categoria por ID
const getCategoriaById = async (req = request, res = response) => {
    const id = req.params.id;
    const categoria = await mnt_categoria.findOne({
        where: {
            id: id,
            is_active: true
        }
    });
    if (categoria == null) {
        return notFoundResponse(res, 'Categoria no encontrada');
    }
    return res.status(200).json(categoria);
};

// Crear una nueva categoria
const crearCategoria = async (req = request, res = response) => {
    const { categoria, descripcion } = req.body;
    let nuevaCategoria;
    try {
        nuevaCategoria = await mnt_categoria.create({
            categoria,
            descripcion,
            is_active: true
        });
    } catch (error) {
        return conflictResponse(res, 'No se pudo crear la categoria');
    }
    return res.status(201).json(nuevaCategoria);
};

// Actualizar una categoria
const updateCategoria = async (req = request, res = response) => {
    const { categoria, descripcion } = req.body;
    const id = req.params.id;
    const categoriaExistente = await mnt_categoria.findByPk(id);
    if (categoriaExistente == null) {
        return notFoundResponse(res, 'La categoria no fue encontrada');
    }
    // Validaciones
    if (categoria !== undefined) {
        categoriaExistente.categoria = categoria;
    }
    if (descripcion !== undefined) {
        categoriaExistente.descripcion = descripcion;
    }
    await categoriaExistente.save();
    return res.status(200).json(categoriaExistente);
};

// Eliminar una categoria (cambio de estado a inactivo)
const deleteCategoria = async (req = request, res = response) => {
    const id = req.params.id;
    const categoria = await mnt_categoria.findOne({
        where: {
            id: id,
            is_active: true
        }
    });
    if (categoria == null) {
        return notFoundResponse(res, 'Categoria no encontrada');
    }
    // Cambiar estado de la categoria
    categoria.is_active = false;
    await categoria.save();
    return res.status(200).json({ mensaje: 'Categoria eliminada correctamente' });
};

// Activar una categoria
const activarCategoria = async (req = request, res = response) => {
    const id = req.params.id;
    const categoria = await mnt_categoria.findOne({
        where: {
            id: id,
            is_active: false
        }
    });
    if (categoria == null) {
        return notFoundResponse(res, 'Categoria no encontrada');
    }
    // Cambiar estado de la categoria
    categoria.is_active = true;
    await categoria.save();
    return res.status(200).json({ mensaje: 'Categoria activada correctamente' });
};

module.exports = {
    getCategoriasList,
    getCategoriaById,
    crearCategoria,
    updateCategoria,
    deleteCategoria,
    activarCategoria
};
