import { Router } from 'express';
import { obtenerRecepciones, registrarRecepcion, eliminarRecepcion, actualizarRecepcion } from '../controllers/recepciones.controller.js';

const router = Router();

//Ruta para obtener todos los servicios
router.get('/obtenerrecepciones', obtenerRecepciones);

router.post('/registrarRecepcion', registrarRecepcion);

router.delete('/eliminarrecepcion/:id', eliminarRecepcion);

router.patch('/actualizarrecepcion/:id', actualizarRecepcion);


export default router;