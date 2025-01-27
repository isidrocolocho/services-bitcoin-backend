const express = require("express");

const {
    getDiasList,
    getDiaById,
    crearDia,
    updateDia,
    deleteDia,
} = require("../controllers/diaController");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/",getDiasList);
router.get("/:id",getDiaById);
router.post("/",crearDia);
router.put("/:id",updateDia);
router.delete("/:id",deleteDia);

module.exports= router;