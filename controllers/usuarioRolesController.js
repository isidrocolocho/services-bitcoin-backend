const {user, rol} = require('../models/index');
const {request, respose} = require('express'); 
const {
    notFoundResponse,
    conflictResponse,
    badRequestResponse
} = require('../utils/responseUtils');

const {validationError} = require('sequelize');

const getUsuarioRoles = async (req=request, res= respose)=> {
    const usuarioId = req.params.id;
    const usuario = await user.findByPk(usuarioId, {
        include: {
            Model: rol,
            through: {
                attributes: []
            }
        },
    });
    if (!usuario) {
        return notFoundResponse(res, 'Usuario no encontrado');
    }
    const roles = usuario.rol;
    return res.status(200).json(roles ?? []);
};

const createUsuarioRoles = async (req= request, res= respose)=>{
    const usuario_id = req.params.id;
    const {rol_id} = req.body;

    const usuario = await user.findByPk(usuarioId,{
        include: {
            model:rol,
            through: {
                attributes:[]
            }
        },
    });
    if(usuario === null) return notFoundResponse(res, 'Usuario no encotrado');
    const role  = await rol.findByPk(rol_id);
    if(role == null) return notFoundResponse(res, 'Rol no encontrado');
    usuario.addRol(role);
    return res.status(201).json(usuario.role); 
};

const deleteUsuarioRole = async (req= request, res=respose)=>{
    const usuario_id = req.params.id;
    const {rol_id} = req.body;

    const usuario = await user.findByPk(usuarioId,{
        include: {
            model:rol,
            through: {
                attributes:[]
            }
        },
    });
    if(usuario === null) return notFoundResponse(res, 'Usuario no encotrado');
    const role  = await rol.findByPk(rol_id);
    if(role == null) return notFoundResponse(res, 'Rol no encontrado');
    usuario.removeRol(role);
    return res.status(204).json(); 
}

module.exports = {
    getUsuarioRoles,
    createUsuarioRoles,
    deleteUsuarioRole
};