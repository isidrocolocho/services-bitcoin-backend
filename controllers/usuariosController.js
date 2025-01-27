// @type {import("express").RequestHandler}

const bcrypt = require("bcrypt");
const {user} = require("../models/index");
const {request, response } = require("express");
const {
    notFoundResponse,
    conflictResponse
} = require("../utils/responseUtils");

const {validationError} = require("sequelize");

const getUsuariosList = async (req=request, res= response) =>{
    const users = await user.findAll({
        attributes: ['id', 'username', 'email', 'is_active', 'createdAt'], // Selección de columnas
        order: [['id', 'ASC']], // Ordenar por 'id' en orden ascendente
      });
    return res.status(200).json(users);
}

const getUsuarioById = async (req=request, res= response) =>{
    const id = req.params.id;
    const usuario = await user.findByPk(id,{
        attributes: ['id', 'username', 'email', 'is_active', 'createdAt'], // Selección de columnas
    });
    if(user===null){
        return notFoundResponse(res,"Usuario no encontrado");
    }
    return res.status(200).json(usuario);
}

const createUsuario = async (req=request, res=response)=>{
    const {username, email, password: plainPassword} = req.body;
    //encriptar contraseña
    const password = await bcrypt.hash(plainPassword,10);
    let usuario ;
    try {
        usuario = await user.create({
            username,
            email,
            password
        });
    } catch (error) {
        if(error instanceof validationError){
            return conflictResponse(res, "No se pudo crear el usaurio");
        }
    }
    usuario.password = undefined;
    return res.status(201).json(usuario);
}

const updateUsuario = async (req=request, res= response)=>{
    const id = req.params.id;
    const {username, email, is_active} = req.body;
    const usuario = await user.findByPk(id,{
        attributes: { exclude : ["password"]}, // excluye contraseña 
    });
    if(usuario===null){
        return notFoundResponse(res,"Usuario no encontrado");
    }
    // validaciones 
    if(username !== undefined){
        user.username = username;
    }

    const existingUser = await user.findOne({where: {email}});
    if (existingUser) {
        // hay un user que tiene ese correo actualmente 
        if (existingUser.id!==id) {
            return res.status(400).json({message: "El correo ya esta en uso"});
        }
    }else{
        usuario.email=email;
    }
    if (password!==undefined) {
        usuario.password = await bcrypt.hash(password,10);
    }

    if (is_active!==undefined) {
        usuario.is_active=is_active;
    }
    await usuario.save();
    return res.status(200).json(usuario);
}

const deleteUsuario = async (req= request, res=response)=>{
    const id = req.params.id;
    const usuario = await user.findByPk(id);
    if (usuario === null) {
        return notFoundResponse(res, "Usuario no encontrado");
    }
    usuario.destroy();
    return res.status(204).json("Usuario Eliminado")
}

module.exports = {
    getUsuariosList,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario,
}