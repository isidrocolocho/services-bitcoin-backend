const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { user, mnt_encargado, permission, rol, rol_permission, mnt_route } = require("../models/index");
const {
    generateAccessToken,
    generateRefreshToken,
} = require("../utils/jwtUtils");

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const usuario = await user.findOne({ where: { email } });

        if (!usuario) {
            return res.status(401).json({
                message: "Usuario no encontrado",
                status: 401,
            });
        }

        // Verificar la contraseña
        const isPasswordValid = await bcrypt.compare(password, usuario.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Contraseña incorrecta",
                status: 401,
            });
        }

        // Generar accessToken y refreshToken
        const accessToken = generateAccessToken({ id: usuario.id, email: usuario.email });
        const refreshToken = generateRefreshToken({ id: usuario.id, email: usuario.email });

        // Guardar los tokens en la base de datos
        await usuario.update({ token: refreshToken });

        return res.json({ accessToken, refreshToken });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
};

const register = async (req, res) => {
    const { username, email, password, nombres, apellido,tipo_registro } = req.body;
    try {
        // Verificar si el email ya existe
        const existingUser = await user.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "El correo ya está en uso" });
        }
        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear el nuevo usuario
        const newUser = await user.create({
            username,
            email,
            password: hashedPassword,
            nombres,
            apellido,
            tipo_registro
        });
        if (tipo_registro==2) {
            const newEncargado = await mnt_encargado.create({
                id_user:newUser.id,
            });
        }
        

        // Generar el token JWT
        const accessToken = generateAccessToken({ id: newUser.id, email: newUser.email });
        const refreshToken = generateRefreshToken({ id: newUser.id, email: newUser.email });

        // Guardar el refreshToken en la base de datos
        await newUser.update({ token: refreshToken });

        return res.status(201).json({
            message: "Usuario registrado exitosamente",
            accessToken,
            refreshToken,
            ok:true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
};

const refreshAccessToken = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({
            message: "Token de actualización no proporcionado",
            status: 401,
        });
    }

    try {
        // Verificar si el refreshToken está en la base de datos
        const usuario = await user.findOne({ where: { token: refreshToken } });

        if (!usuario) {
            return res.status(401).json({
                message: "Refresh token inválido o expirado",
                status: 401,
            });
        }

        // Verificar el refreshToken
        const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        // Generar un nuevo accessToken
        const accessToken = generateAccessToken({ id: payload.id, email: payload.email });

        return res.json({ accessToken });
    } catch (error) {
        console.error(error);
        return res.status(401).json({
            message: "Refresh token no válido",
            status: 401,
        });
    }
};

const logout = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).json({ message: "Token de actualización no proporcionado" });
    }

    try {
        // Eliminar el refreshToken de la base de datos
        const usuario = await user.findOne({ where: { token: refreshToken } });

        if (!usuario) {
            return res.status(400).json({ message: "Token inválido" });
        }

        await usuario.update({ token: null });

        return res.json({ message: "Sesión cerrada" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
};

const getMenu = async (req, res) => {
    try {
      const userId = 1; // Suponemos que `req.user` contiene al usuario autenticado
      const usuario = await user.findByPk(userId, {
        include: [
          {
            model: rol, as : 'roles',
            include: [
              {
                model: permission, as : 'permissions',
                through: { attributes: [] }, // Para evitar incluir la tabla intermedia
                
              }
            ]
          }
        ]
      });

      let permissionsID = [];
      //console.log(usuario);
      

      // Obtener permisos según el rol del usuario
      if (usuario.roles && usuario.roles.some((rol) => rol.id === 1)) {
        const allPermissions = await permission.findAll();
        permissionsID = allPermissions.map((permission) => permission.id);
      } else if (usuario.roles) {
        permissionsID = usuario.roles.flatMap((rol) => rol.permissions.map((permission) => permission.id));
      }
      console.log(permissionsID);
      
      // Consultar rutas principales
      const routes = await mnt_route.findAll({
        where: {
          id_permission: permissionsID,
          deletedAt: null,
        },
        include: {
          model: mnt_route,
          as: 'children',
        },
      });
      //console.log(routes);
      
      // Filtrar rutas padres con hijos accesibles
      const rutasPadres = await mnt_route.findAll({
        where: {
          id_ruta_padre: null,
          deletedAt: null,
          id_permission: permissionsID,
        },
        include: {
          model: mnt_route,
          as: 'children',
          required: false, // Incluir rutas padres aunque no tengan hijos
          where: {
            id: routes.map((route) => route.id),
          },
        },
      });

      //console.log(rutasPadres);
      

      return res.json({
        routes: rutasPadres,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener el menú' });
    }
  };
  const getPermisos = async (req, res) => {

  };

module.exports = { login, register, refreshAccessToken, logout, getMenu, getPermisos };
