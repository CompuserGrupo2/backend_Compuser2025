import { Router } from 'express';
import { obtenerDiagnosticoConDetalles } from '../controllers/diagnostico.controller.js';

const router = Router();

//Ruta para obtener todos los servicios
router.get('/diagnosticos', obtenerDiagnosticoConDetalles);


export default router;