const express = require("express");

const {
    getEncargadoList,
    getEncargadoById,
    crearEncargado,
    updateEncargado,
    deleteEncargado,
    activarEncargado,
} = require("../controllers/mntEncargadoController");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/",getEncargadoList);
router.get("/:id",getEncargadoById);
router.post("/",crearEncargado);
router.put("/:id",updateEncargado);
router.delete("/:id",deleteEncargado);
router.get("/activar/:id",activarEncargado);

module.exports= router;