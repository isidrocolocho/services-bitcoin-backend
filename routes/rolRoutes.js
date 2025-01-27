const express = require("express");

const {
    getRolesList,
    getRolById,
    crearRol,
    updateRol,
    deleteRol,
    activarRol
} = require("../controllers/rolesController");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/",getRolesList);
router.get("/:id",getRolById);
router.post("/",crearRol);
router.put("/:id",updateRol);
router.delete("/:id",deleteRol);
router.get("/activar/:id",activarRol);

module.exports= router;