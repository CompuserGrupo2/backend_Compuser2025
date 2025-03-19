import { Router } from 'express';
import { obtenerEmpleados, obtenerEmpleadoID, insertarEmpleado, eliminarEmpleado, actualizarEmpleado } from '../controllers/empleados.controller.js';

const router = Router();

//Ruta para obtener todos los empleados
router.get('/empleados', obtenerEmpleados);

router.get('/empleado/:id', obtenerEmpleadoID);

router.post('/empleados', insertarEmpleado);

router.patch('/empleados/:id', actualizarEmpleado);

router.delete('/empleados/:id', eliminarEmpleado);

export default router;