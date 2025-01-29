const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { user, mnt_encargado, permission, rol, rol_permission, mnt_route } = require("../models/index");
const {
    generateAccessToken,
    generaterefresh_token,
} = require("../utils/jwtUtils");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
      const usuario = await user.findOne({ where: { email } });

      if (!usuario) {
          return res.status(401).json({ message: "Usuario no encontrado", status: 401 });
      }

      // Verificar la contraseña
      const isPasswordValid = await bcrypt.compare(password, usuario.password);
      if (!isPasswordValid) {
          return res.status(401).json({ message: "Contraseña incorrecta", status: 401 });
      }

      // Generar tokens
      const accessToken = generateAccessToken({ id: usuario.id, email: usuario.email });
      const refresh_token = generaterefresh_token({ id: usuario.id, email: usuario.email });

      // Guardar el refresh_token en la base de datos
      await usuario.update({ token: refresh_token });

      // Guardar datos en la sesión
      req.session.user = {
          id: usuario.id,
          email: usuario.email,
          token: refresh_token,
      };
      const data =  {
        token:  refresh_token,
        refresh_token,
      }
      req.session.save((err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Error al guardar la sesión" });
        }
        return res.json(data);
      });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error en el servidor" });
  }
};

const register = async (req, res) => {
  const { username, email, password, nombres, apellido, tipo_registro } = req.body;
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
          tipo_registro,
      });

      if (tipo_registro == 2) {
          await mnt_encargado.create({ id_user: newUser.id });
      }

      // Generar tokens
      const accessToken = generateAccessToken({ id: newUser.id, email: newUser.email });
      const refresh_token = generaterefresh_token({ id: newUser.id, email: newUser.email });

      // Guardar el refresh_token en la base de datos
      await newUser.update({ token: refresh_token });

      // Guardar datos en la sesión
      req.session.user = {
          id: newUser.id,
          email: newUser.email,
          refresh_token,
      };

      return res.status(201).json({
          message: "Usuario registrado exitosamente",
          token:accessToken,
      });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error en el servidor" });
  }
};

const refreshAccessToken = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(401).json({
                message: "Token de actualización no proporcionado",
                status: 401,
            });
        }
        // Verificar si el token está en la base de datos
        const usuario = await user.findOne({ where: { token: token } });

        if (!usuario) {
            return res.status(401).json({
                message: "Refresh token inválido o expirado",
                status: 401,
            });
        }

        // Verificar el refresh_token
        const payload = jwt.verify(refresh_token, process.env.JWT_REFRESH_SECRET);

        // Generar un nuevo accessToken
        const accessToken = generateAccessToken({ id: payload.id, email: payload.email });

        return res.json({ token });
    } catch (error) {
        console.error(error);
        return res.status(401).json({
            message: "Refresh token no válido",
            status: 401,
        });
    }
};

const logout = async (req, res) => {
    try {
      
        const refresh_token  = req.headers.refresh_token;

        if (!refresh_token) {
            return res.status(400).json({ message: "Token de actualización no proporcionado" });
        }

        // Eliminar el token de la base de datos
        const usuario = await user.findOne({ where: { token: refresh_token } });
        if (usuario) {
            await usuario.update({ token: null });
        }

        // Destruir la sesión
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: "Error al cerrar sesión" });
            }
            return res.json({ message: "Sesión cerrada" });
        });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error en el servidor" });
  }
};

const getMenu = async (req, res) => {
    const refresh_token  = req.headers.refresh_token;

    if (!refresh_token) {
        return res.status(400).json({ message: "Token de actualización no proporcionado" });
    }


    try {
        // Buscar el usuario asociado al token
        const usuarioCompleto = await user.findOne({ where: { token: refresh_token } });
        if (!usuarioCompleto) {
            return res.status(401).json({ message: "Usuario no encontrado", status: 401 });
        }

        // Buscar roles y permisos del usuario
        const usuario = await user.findByPk(usuarioCompleto.id, {
          include: [
              {
                  model: rol,
                  as: "roles",
                  include: [
                      {
                          model: permission,
                          as: "permissions",
                          through: { attributes: [] }, // Para evitar incluir la tabla intermedia
                      },
                  ],
              },
          ],
      });

      let permissionsID = [];

      // Obtener permisos según el rol del usuario
      if (usuario.roles && usuario.roles.some((rol) => rol.id === 1)) {
          const allPermissions = await permission.findAll();
          permissionsID = allPermissions.map((permission) => permission.id);
      } else if (usuario.roles) {
          permissionsID = usuario.roles.flatMap((rol) =>
              rol.permissions.map((permission) => permission.id)
          );
      }

      // Consultar rutas principales
      const routes = await mnt_route.findAll({
          where: {
              id_permission: permissionsID,
              deletedAt: null,
          },
          include: {
              model: mnt_route,
              as: "children",
          },
      });

      // Filtrar rutas padres con hijos accesibles
      const rutasPadres = await mnt_route.findAll({
          where: {
              id_ruta_padre: null,
              deletedAt: null,
              id_permission: permissionsID,
          },
          include: {
              model: mnt_route,
              as: "children",
              required: false, // Incluir rutas padres aunque no tengan hijos
              where: {
                  id: routes.map((route) => route.id),
              },
          },
      });

      return res.json({
          routes: rutasPadres,
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener el menú" });
  }
};



const getPermisos = async (req, res) => {
    const refresh_token  = req.headers.refresh_token;

    if (!refresh_token) {
        return res.status(400).json({ message: "Token de actualización no proporcionado" });
    }
    try {

        // Buscar el usuario asociado al token
        const usuarioCompleto = await user.findOne({ where: { token: refresh_token } });
        if (!usuarioCompleto) {
            return res.status(401).json({ message: "Usuario no encontrado", status: 401 });
    }

    // Buscar roles y permisos del usuario
    const usuario = await user.findByPk(usuarioCompleto.id, {
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
      let allPermissions = [];

      // Obtener permisos según el rol del usuario
      if (usuario.roles && usuario.roles.some((rol) => rol.id === 1)) {
        allPermissions = await permission.findAll();
        permissionsID = allPermissions.map((permission) => permission.id);
      } else if (usuario.roles) {
        permissionsID = usuario.roles.flatMap((rol) => rol.permissions.map((permission) => permission.id));
        allPermissions = await permission.findAll({
          where: {
          id: permissionsID
          }
        });
      }

      return res.json({
        permisos: allPermissions,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener los permisos' });
    }
};

const getUsuario = async (req, res) => {
    const refresh_token  = req.headers.refresh_token;
    if (!refresh_token) {
        return res.status(400).json({ message: "Token de actualización no proporcionado" });
    }

    try {
        const usuario = await user.findOne({ where: { token: refresh_token } });
        return res.json(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener el usuario" });
    }
};

module.exports = { login, register, refreshAccessToken, logout, getMenu, getPermisos, getUsuario };
