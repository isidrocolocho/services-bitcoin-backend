const express = require("express");

const {
    getUsuariosList,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario,
} = require("../controllers/usuariosController");
const {
    getUsuarioRoles,
    createUsuarioRoles,
    deleteUsuarioRole
} = require("../controllers/usuarioRolesController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/",getUsuariosList);
router.get("/:id",getUsuarioById);
router.post("/",createUsuario);
router.put("/:id",updateUsuario);
router.delete("/:id",deleteUsuario);

// usuarioRol
router.get("/:id/roles",getUsuarioRoles);
router.post("/:id/roles",createUsuarioRoles);
router.delete("/:id/roles",deleteUsuarioRole);
module.exports= router;