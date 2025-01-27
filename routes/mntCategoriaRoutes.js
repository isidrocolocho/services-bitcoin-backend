const express = require("express");

const {
    getCategoriasList,
    getCategoriaById,
    crearCategoria,
    updateCategoria,
    deleteCategoria,
    activarCategoria
} = require("../controllers/mntCategoriaController");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/",getCategoriasList);
router.get("/:id",getCategoriaById);
router.post("/",crearCategoria);
router.put("/:id",updateCategoria);
router.delete("/:id",deleteCategoria);
router.get("/activar/:id",activarCategoria);

module.exports= router;