const express = require("express");

const {
    getHospitalesList,
    getHospitalById,
    crearHospital,
    updateHospital,
    deleteHospital,
    activarHospital
} = require("../controllers/mntHospitalController");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/",getHospitalesList);
router.get("/:id",getHospitalById);
router.post("/",crearHospital);
router.put("/:id",updateHospital);
router.delete("/:id",deleteHospital);
router.get("/activar/:id",activarHospital);

module.exports= router;