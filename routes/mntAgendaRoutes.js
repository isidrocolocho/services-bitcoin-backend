const express = require("express");

const {
    getAgendasList,
    getAgendaById,
    crearAgenda,
    updateAgenda,
    deleteAgenda,
} = require("../controllers/mntAgendaController");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/",getAgendasList);
router.get("/:id",getAgendaById);
router.post("/",crearAgenda);
router.put("/:id",updateAgenda);
router.delete("/:id",deleteAgenda);

module.exports= router;