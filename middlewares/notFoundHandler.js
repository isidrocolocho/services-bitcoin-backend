const notFoundHandler = (req, res, next) => { 
        res.status(404).json({ 
        message: "La ruta solicitada no existe", 
        status: 404, 
        }); 
    }; 
  
module.exports = notFoundHandler; 