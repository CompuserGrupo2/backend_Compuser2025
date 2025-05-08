import { Router } from 'express';
import { obtenerDiagnosticoConDetalles, obtenerDiagnosticos, obtenerDiagnosticoPorId, eliminarDiagnostico, registrarDiagnostico, actualizarDiagnostico } from '../controllers/diagnostico.controller.js';

const router = Router();

//Ruta para obtener todos los diagnosticos con sus detalles
router.get('/obtenerdiagnosticocondetalles', obtenerDiagnosticoConDetalles);

//Ruta para obtener todos los diagnosticos
router.get('/obtenerdiagnosticos', obtenerDiagnosticos);

//Ruta para obtener diagnóstico por ID
router.get('/obtenerdiagnosticoporid/:id_diag', obtenerDiagnosticoPorId);

// Ruta para registrar un nuevo diagnóstico
router.post('/registrardiagnostico', registrarDiagnostico);

// Ruta para eliminar un diagnóstico
router.delete('/eliminardiagnostico/:id_diag', eliminarDiagnostico);

// Ruta para actualizar una venta
router.patch('/actualizardiagnostico/:id_diag', actualizarDiagnostico);


export default router;