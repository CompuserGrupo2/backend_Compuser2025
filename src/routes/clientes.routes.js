import { Router } from 'express';
import { obtenerClientes, obtenerClienteID, insertarCliente, eliminarCliente, actualizarCliente } from '../controllers/clientes.controller.js';

const router = Router();

//Ruta para obtener todos los clientes
router.get('/clientes', obtenerClientes);

router.get('/cliente/:id', obtenerClienteID);

router.post('/clientes', insertarCliente);

router.patch('/clientes/:id', actualizarCliente);

router.delete('/clientes/:id', eliminarCliente);

export default router;