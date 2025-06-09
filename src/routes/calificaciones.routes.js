import { Router } from 'express';
import { obtenerPromedioPorServicio, registrarCalificacion,
         responderCalificacion, obtenerCalificacionesPorServicio, obtenerTodasLasCalificaciones } from '../controllers/calificaciones.controller.js';

const router = Router();

// Ruta para obtener el promedio de estrellas por servicio
router.get('/promediocalificacion/:id', obtenerPromedioPorServicio);

router.get('/obtenercalificacionesporservicio/:id', obtenerCalificacionesPorServicio);

router.post('/registrarcalificacion', registrarCalificacion)

router.put('/calificaciones/:id/responder', responderCalificacion);

router.get('/obtenercalificaciones', obtenerTodasLasCalificaciones);


export default router;