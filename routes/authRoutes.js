const express = require("express"); 
const { 
    register, 
    login,
    refreshAccessToken, 
    logout, 
    getMenu,
    getPermisos
} = require("../controllers/authController"); 

const router = express.Router(); 
router.post("/register", register); 
router.post("/login", login); 
router.post("/refresh-token", refreshAccessToken); 
router.post("/logout", logout); 
router.get("/menu", getMenu); 
router.post("/permisos", getPermisos); 

module.exports = router; 