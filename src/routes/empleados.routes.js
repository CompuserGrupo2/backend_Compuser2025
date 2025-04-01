import { Router } from 'express';
import { obtenerEmpleados, obtenerEmpleadoID, insertarEmpleado } from '../controllers/empleados.controller.js';

const router = Router();

//Ruta para obtener todos los empleados
router.get('/obtenerempleados', obtenerEmpleados);

router.get('/empleado/:id', obtenerEmpleadoID);

router.post('/insertarempleado', insertarEmpleado);

export default router;