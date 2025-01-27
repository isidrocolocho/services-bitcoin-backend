const express = require("express");

const {
    getEmpresaList,
    getEmpresaById,
    crearEmpresa,
    updateEmpresa,
    deleteEmpresa,
    activarEmpresa
} = require("../controllers/mntEmpresaController");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/",getEmpresaList);
router.get("/:id",getEmpresaById);
router.post("/",crearEmpresa);
router.put("/:id",updateEmpresa);
router.delete("/:id",deleteEmpresa);
router.get("/activar/:id",activarEmpresa);

module.exports= router;