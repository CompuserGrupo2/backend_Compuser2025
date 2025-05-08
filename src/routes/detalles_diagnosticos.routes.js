import { Router } from 'express';
import { obtenerDetallesDiagnostico } from '../controllers/detalles_diagnosticos.controller.js';

const router = Router();

// Ruta para obtener los detalles de una venta
router.get('/obtenerdetallesdiagnostico/:id', obtenerDetallesDiagnostico);


export default router;