const express = require("express"); 
const { 
    getTipoRegistrosList,
    getTipoRegistroById,
    crearTipoRegistro,
    updateTipoRegistro,
    deleteTipoRegistro,
} = require("../controllers/mntTipoRegistroController"); 

const router = express.Router(); 
router.get("/",getTipoRegistrosList);
router.get("/:id",getTipoRegistroById);
router.post("/",crearTipoRegistro);
router.put("/:id",updateTipoRegistro);
router.delete("/:id",deleteTipoRegistro);

module.exports = router; 