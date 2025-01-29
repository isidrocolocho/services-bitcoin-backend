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
          return res.status(401).json({ message: "Usuario no encontrado", status: 401 });
      }

      // Verificar la contraseña
      const isPasswordValid = await bcrypt.compare(password, usuario.password);
      if (!isPasswordValid) {
          return res.status(401).json({ message: "Contraseña incorrecta", status: 401 });
      }

      // Generar tokens
      const accessToken = generateAccessToken({ id: usuario.id, email: usuario.email });
      const refreshToken = generateRefreshToken({ id: usuario.id, email: usuario.email });

      // Guardar el refreshToken en la base de datos
      await usuario.update({ token: refreshToken });

      // Guardar datos en la sesión
      req.session.user = {
          id: usuario.id,
          email: usuario.email,
          refreshToken,
      };
      req.session.save((err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Error al guardar la sesión" });
        }
        console.log(req.session.user);
        return res.json({ message: "Inicio de sesión exitoso", accessToken });
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
      const refreshToken = generateRefreshToken({ id: newUser.id, email: newUser.email });

      // Guardar el refreshToken en la base de datos
      await newUser.update({ token: refreshToken });

      // Guardar datos en la sesión
      req.session.user = {
          id: newUser.id,
          email: newUser.email,
          refreshToken,
      };

      return res.status(201).json({
          message: "Usuario registrado exitosamente",
          accessToken,
      });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error en el servidor" });
  }
};

const refreshAccessToken = async (req, res) => {
  if (!req.session.user || !req.session.user.refreshToken) {
    return res.status(401).json({
        message: "No autorizado. Sesión no activa o token no disponible.",
        status: 401,
    });
  }

  try {
      const { refreshToken } = req.session.user;
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
  try {
      if (req.session.user) {
          const { refreshToken } = req.session.user;

          // Eliminar el token de la base de datos
          const usuario = await user.findOne({ where: { token: refreshToken } });
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
      } else {
          return res.status(400).json({ message: "No hay sesión activa" });
      }
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error en el servidor" });
  }
};

const getMenu = async (req, res) => {
  if (!req.session.user || !req.session.user.refreshToken) {
      return res.status(401).json({
          message: "No autorizado. Sesión no activa o token no disponible.",
          status: 401,
      });
  }

  try {
      const { refreshToken } = req.session.user;

      // Buscar el usuario asociado al refreshToken
      const usuarioCompleto = await user.findOne({ where: { token: refreshToken } });
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
  if (!req.session.user || !req.session.user.refreshToken) {
    return res.status(401).json({
        message: "No autorizado. Sesión no activa o token no disponible.",
        status: 401,
    });
  }

try {
    const { refreshToken } = req.session.user;

    // Buscar el usuario asociado al refreshToken
    const usuarioCompleto = await user.findOne({ where: { token: refreshToken } });
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
      console.log(allPermissions);
      

      return res.json({
        permisos: allPermissions,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener los permisos' });
    }
};

const getUsuario = async (req, res) => {
  console.log(req.session.user)
  if (!req.session.user) {
      return res.status(401).json({ message: "No autorizado" });
  }

  try {
      const { id } = req.session.user;
      const usuario = await user.findByPk(id);
      return res.json(usuario);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener el usuario" });
  }
};

module.exports = { login, register, refreshAccessToken, logout, getMenu, getPermisos, getUsuario };
