import { Router } from 'express';
import { obtenerClientes, obtenerClienteID, insertarCliente} from '../controllers/clientes.controller.js';

const router = Router();

//Ruta para obtener todos los clientes
router.get('/obtenerclientes', obtenerClientes);

router.get('/cliente/:id', obtenerClienteID);

router.post('/insertarcliente', insertarCliente);

export default router;