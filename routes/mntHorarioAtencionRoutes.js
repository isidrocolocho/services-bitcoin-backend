const express = require("express");

const {
    getHorariosAtencionList,
    getHorarioAtencionById,
    crearHorarioAtencion,
    updateHorarioAtencion,
    deleteHorarioAtencion,
    activarHorarioAtencion,
} = require("../controllers/mntHorarioAtencionController");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/",getHorariosAtencionList);
router.get("/:id",getHorarioAtencionById);
router.post("/",crearHorarioAtencion);
router.put("/:id",updateHorarioAtencion);
router.delete("/:id",deleteHorarioAtencion);
router.get("/activar/:id",activarHorarioAtencion);

module.exports= router;