const express = require("express"); 
const { 
    register, 
    login,
    refreshAccessToken, 
    logout, 
    getMenu,
    getPermisos,
    getUsuario
} = require("../controllers/authController"); 

const router = express.Router(); 
router.post("/register", register); 
router.post("/login", login); 
router.get("/refresh-token", refreshAccessToken); 
router.get("/logout", logout); 
router.get("/menu", getMenu); 
router.get("/permisos", getPermisos); 
router.get("/usuario", getUsuario); 

module.exports = router; 