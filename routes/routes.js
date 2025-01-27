const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser')
const cors = require("cors");
//Middleware
const notFoundHandler = require("../middlewares/notFoundHandler");
const errorHandler = require("../middlewares/errorHandler");
// importando routes 
const authRoutes = require("./authRoutes"); 
const usuariosRoutes = require("./usuarioRoutes"); 
const rolesRoutes = require("./rolRoutes"); 
const mntTipoRegistroRoutes = require("./mntTipoRegistroRoutes")
const diaRoutes = require("./diaRoutes")
const mntCategoriaRoutes = require("./mntCategoriaRoutes")
const mntEmpresaRoutes = require("./mntEmpresaRoutes")
const mntEncargadoRoutes = require("./mntEncargadoRoutes")
const mntHorarioAtencionRoutes = require("./mntHorarioAtencionRoutes")
const mntServicioRoutes = require("./mntServicioRoutes")
const ctlEstadoAgendaRoutes = require("./ctlEstadoAgendaRoutes")
const mntAgendaRoutes = require("./mntAgendaRoutes")


const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

// Registrar rutas: 
app.use("/auth", authRoutes); 
app.use("/usuarios", usuariosRoutes); 
app.use("/roles", rolesRoutes); 
app.use("/tipo/registro", mntTipoRegistroRoutes); 
app.use("/dia", diaRoutes); 
app.use("/categoria", mntCategoriaRoutes); 
app.use("/empresa", mntEmpresaRoutes); 
app.use("/encargado", mntEncargadoRoutes); 
app.use("/horario/atencion", mntHorarioAtencionRoutes); 
app.use("/servicio", mntServicioRoutes); 
app.use("/estado/agenda", ctlEstadoAgendaRoutes); 
app.use("/agenda", mntAgendaRoutes); 


app.get('*',(req, res) => 
    res.status(200).send({message: "Bienvenido a API con nodejs",}),
);

//para manejar rutas inexistentes 
app.use(notFoundHandler);
// manejar error en las rutas 
app.use(errorHandler);

module.exports=app;