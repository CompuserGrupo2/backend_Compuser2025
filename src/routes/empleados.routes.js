import { Router } from 'express';
import { obtenerEmpleados, obtenerEmpleadoID, insertarEmpleado, eliminarEmpleado, actualizarEmpleado } from '../controllers/empleados.controller.js';

const router = Router();

//Ruta para obtener todos los empleados
router.get('/obtenerempleados', obtenerEmpleados);

router.get('/empleado/:id', obtenerEmpleadoID);

router.post('/insertarempleado', insertarEmpleado);

router.delete('/eliminarempleado/:id', eliminarEmpleado);

router.patch('/actualizarempleado/:id', actualizarEmpleado);

export default router;