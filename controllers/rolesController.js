const {rol} = require('../models/index');
const {request, response} = require('express');
const {
    notFoundResponse,
    conflictResponse,
} = require('../utils/responseUtils');

const {ValidationError, where} = require('sequelize');

const getRolesList = async (req= request, res = response)=>{
    const roles = await rol.findAll({
        where: {
            is_active: true
        },
        order: [["id", "ASC"]] // Corrección: se categoria el orden como un array de arrays
    });    
    return res.status(200).json(roles);
};


const getRolById = async (req=request, res = response)=>{
    const id = req.params.id;
    const role = await rol.findOne({where: {
        id:id,
        is_active:true
    }});
    if(role==null){
        return notFoundResponse(res,'Rol no Encontrado');
    }
    return res.status(200).json(role);
};

const crearRol = async (req=request, res=response)=>{
    const {name, description} = req.body;
    let role;
    try {
        role = await rol.create({
            name,
            description
        })
    } catch (error) {
        return conflictResponse(res, 'no se pudo crear el rol');
    }
    return res.status(201).json(role);
}

const updateRol = async (req=request, res=response)=>{
    const {name, description}= req.body;
    const id = req.params.id;
    const role = await rol.findByPk(id);
    if(role==null){
        return notFoundResponse(res, ' El rol que busca no fue encontrada');
    }
    // validaciones 
    if (name!= undefined) {
        role.name = name;
    }
    if (description !== undefined) {
        role.description=description;
    }
    await role.save();
    return res.status(200).json(role);
};

const deleteRol = async (req=request, res=response)=>{
    const id = req.params.id;
    const role = await rol.findOne({where: {
        id:id,
        is_active:true
    }});
    if(role== null){
        return notFoundResponse(res,'Rol no encontrado');
    }
    // cambiar estado de rol
    role.is_active=false;
    await role.save();
    return res.status(200).json({menssage: 'Rol eliminado correctamente'});
};

const activarRol = async (req=request, res=response)=>{
    const id = req.params.id;
    const role = await rol.findOne({where: {
        id:id,
        is_active:false
    }});
    if(role== null){
        return notFoundResponse(res,'Rol no encontrado');
    }
    // cambiar estado de rol
    role.is_active=false;
    await role.save();
    return res.status(200).json({menssage: 'Rol activado correctamente'});
};



module.exports = {
    getRolesList,
    getRolById,
    crearRol,
    updateRol,
    deleteRol,
    activarRol
}