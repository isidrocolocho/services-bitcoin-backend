const express = require("express");

const {
    getMedicosList,
    getMedicoById,
    crearMedico,
    updateMedico,
    deleteMedico,
    activarMedico,
} = require("../controllers/mntMedicoController");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/",getMedicosList);
router.get("/:id",getMedicoById);
router.post("/",crearMedico);
router.put("/:id",updateMedico);
router.delete("/:id",deleteMedico);
router.get("/activar/:id",activarMedico);

module.exports= router;