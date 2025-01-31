const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { sequelize, store } = require('../models'); // Importa la instancia de Sequelize y la tienda de sesiones
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
const mntBienRoutes = require("./mntBienRoutes")
const ctlEstadoAgendaRoutes = require("./ctlEstadoAgendaRoutes")
const mntAgendaCarritoRoutes = require("./mntAgendaCarritoRoutes")


const app = express();

// Configuración de la sesión
app.use(session({
  secret: process.env.SESSION_SECRET, // Cambia esto por una cadena secreta segura
  resave: false,
  saveUninitialized: false,
  store: store, // Usa la tienda de sesiones exportada
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 24 horas
    secure: false, // Asegúrate de que esto esté configurado correctamente para tu entorno
    httpOnly: true
  }
}));


// Resto de tu configuración de Express
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
app.use("/bienes", mntBienRoutes); 
app.use("/estado/agenda", ctlEstadoAgendaRoutes); 
app.use("/accion", mntAgendaCarritoRoutes); 


app.get('*',(req, res) => 
    res.status(200).send({message: "Bienvenido a API con nodejs",}),
);

//para manejar rutas inexistentes 
app.use(notFoundHandler);
// manejar error en las rutas 
app.use(errorHandler);

module.exports=app;