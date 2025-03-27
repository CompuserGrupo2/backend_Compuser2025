import { Router } from 'express';
import { obtenerEquipos } from '../controllers/equiposcomputarizados.controller.js';

const router = Router();

//Ruta para obtener todos los servicios
router.get('/equipos', obtenerEquipos);


export default router;