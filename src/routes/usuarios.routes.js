import { Router } from 'express';
import { obtenerUsuarios, obtenerUsuarioID, verificarUsuario,
         eliminarUsuario, insertarUsuario, actualizarUsuario } from '../controllers/usuarios.controller.js';

const router = Router();

// Ruta para obtener todos los usuarios.
router.get('/obtenerusuarios', obtenerUsuarios);

// Ruta para obtener un usuario por su ID.
router.get('/usuario/:id', obtenerUsuarioID);

// Ruta para verificar un usuario y contraseña.
router.post('/verificar', verificarUsuario);

router.post('/insertarusuario', insertarUsuario);

router.delete('/eliminarusuario/:id', eliminarUsuario);

router.patch('/actualizarusuario/:id', actualizarUsuario);

export default router;