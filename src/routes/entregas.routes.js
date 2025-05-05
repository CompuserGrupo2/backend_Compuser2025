import { Router } from 'express';
import { obtenerEntregas, registrarEntrega, eliminarEntrega, actualizarEntrega } from '../controllers/entregas.controller.js';

const router = Router();

//Ruta para obtener todos los servicios
router.get('/obtenerentregas', obtenerEntregas);

router.post('/registrarentrega', registrarEntrega);

router.delete('/eliminarentrega/:id', eliminarEntrega);

router.patch('/actualizarentrega/:id', actualizarEntrega);


export default router;