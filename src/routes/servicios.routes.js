import { Router } from 'express';
import { obtenerServicios, obtenerServicioID, insertarServicio, eliminarServicio, actualizarServicio } from '../controllers/servicios.controller.js';

const router = Router();

//Ruta para obtener todos los servicios
router.get('/servicios', obtenerServicios);

router.get('/servicio/:id', obtenerServicioID);

router.post('/servicios', insertarServicio);

router.patch('/servicios/:id', actualizarServicio);

router.delete('/servicios/:id', eliminarServicio);

export default router;