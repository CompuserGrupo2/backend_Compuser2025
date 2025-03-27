import { Router } from 'express';
import { obtenerEntregas } from '../controllers/entregas.controller.js';

const router = Router();

//Ruta para obtener todos los servicios
router.get('/entregas', obtenerEntregas);


export default router;