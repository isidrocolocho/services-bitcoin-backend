const express = require("express");

const {
    getEstadosAgendaList,
    getEstadoAgendaById,
    crearEstadoAgenda,
    updateEstadoAgenda,
    deleteEstadoAgenda
} = require("../controllers/ctlEstadoAgendaController");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/",getEstadosAgendaList);
router.get("/:id",getEstadoAgendaById);
router.post("/",crearEstadoAgenda);
router.put("/:id",updateEstadoAgenda);
router.delete("/:id",deleteEstadoAgenda);

module.exports= router;