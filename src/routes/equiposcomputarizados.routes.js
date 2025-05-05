import { Router } from 'express';
import { obtenerEquipos, registrarEquipo, eliminarEquipo, actualizarEquipo } from '../controllers/equiposcomputarizados.controller.js';

const router = Router();

//Ruta para obtener todos los servicios
router.get('/obtenerequipos', obtenerEquipos);

router.post('/registrarequipo', registrarEquipo);

router.delete('/eliminarequipo/:id', eliminarEquipo);

router.patch('/actualizarequipo/:id', actualizarEquipo);


export default router;