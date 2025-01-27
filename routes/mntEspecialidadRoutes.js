const express = require("express");

const {
    getEspecialidadesList,
    getEspecialidadById,
    crearEspecialidad,
    updateEspecialidad,
    deleteEspecialidad,
    activarEspecialidad
} = require("../controllers/mntEspecialidadController");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/",getEspecialidadesList);
router.get("/:id",getEspecialidadById);
router.post("/",crearEspecialidad);
router.put("/:id",updateEspecialidad);
router.delete("/:id",deleteEspecialidad);
router.get("/activar/:id",activarEspecialidad);

module.exports= router;