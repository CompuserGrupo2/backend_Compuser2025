import { Router } from 'express';
import { obtenerClientes, obtenerClienteID, insertarCliente, eliminarCliente, actualizarCliente} from '../controllers/clientes.controller.js';

const router = Router();

//Ruta para obtener todos los clientes
router.get('/obtenerclientes', obtenerClientes);

router.get('/cliente/:id', obtenerClienteID);

router.post('/insertarcliente', insertarCliente);

router.delete('/eliminarcliente/:id', eliminarCliente);

router.patch('/actualizarcliente/:id', actualizarCliente);

export default router;