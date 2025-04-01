import { Router } from 'express';
import { obtenerServicios, obtenerServicioID, insertarServicio, eliminarServicio, actualizarServicio } from '../controllers/servicios.controller.js';

const router = Router();

//Ruta para obtener todos los servicios
router.get('/obtenerservicios', obtenerServicios);

router.get('/servicio/:id', obtenerServicioID);

router.post('/insertarservicio', insertarServicio);


export default router;