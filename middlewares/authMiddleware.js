const jwt = require('jsonwebtoken');

const authMiddleware = (req,res, next)=>{
    const token = req.headers['authorization']?.split(" ")[1]; // extrae el token del header
    if(!token){
        return res.status(401).json({message:"Acceso denegado, token no proporcionado"});
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET); //verifica el token con el secret en nuestro .env
        req.user = decoded; // guarda los datos decodificados en `req.user`para usarlos en las rutas
        next(); // Contunia con la siguiente funcion en la ruta
    } catch (error) {
        return res.status(403).json({message: "Token no valido. "});        
    }
};

module.exports = authMiddleware;