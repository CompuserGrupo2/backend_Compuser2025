import { Router } from 'express';
import { obtenerRecepciones } from '../controllers/recepciones.controller.js';

const router = Router();

//Ruta para obtener todos los servicios
router.get('/recepciones', obtenerRecepciones);


export default router;