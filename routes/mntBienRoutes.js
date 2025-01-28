const express = require("express");

const {
    getBienesList,
    getBienById,
    crearBien,
    updateBien,
    deleteBien,
    activarBien,
} = require("../controllers/mntBienController");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/",getBienesList);
router.get("/:id",getBienById);
router.post("/",crearBien);
router.put("/:id",updateBien);
router.delete("/:id",deleteBien);
router.get("/activar/:id",activarBien);

module.exports= router;