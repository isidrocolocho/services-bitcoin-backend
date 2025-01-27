const express = require("express");

const {
    getServiciosList,
    getServicioById,
    crearServicio,
    updateServicio,
    deleteServicio,
    activarServicio,
} = require("../controllers/mntServicioController");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/",getServiciosList);
router.get("/:id",getServicioById);
router.post("/",crearServicio);
router.put("/:id",updateServicio);
router.delete("/:id",deleteServicio);
router.get("/activar/:id",activarServicio);

module.exports= router;