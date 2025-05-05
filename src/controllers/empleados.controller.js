import { pool } from '../db.js';

//Obtener todos los empleados
export const obtenerEmpleados = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM Empleados');
        res.json(result);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ha ocurrido un error al leer los datos de los empleados.',
            error: error
        });
    }
};

//Obtener un empleado por medio del ID
export const obtenerEmpleadoID = async (req, res) => {
    try{
        const [result] = await pool.query('SELECT * FROM Empleados WHERE id_empleado = ?', [req.params.id]);

        if(result.length <= 0){
            return res.status(404).json({
                message: `Error al leer los datos. Id ${id_empleado} del empleado no encontrado.`
            });
        }
        res.json(result[0]);
    } catch (error){
        return res.status(500).json({
            message: 'Ha ocurrido un error al leer los datos del empleado.'
        });
    }
};

//Insertar un empleado
export const insertarEmpleado = async (req, res) => {
    try{
        const {nombre, apellido, direccion, telefono, cedula} = req.body;
        const [result] = await pool.query(
            'INSERT INTO Empleados (nombre, apellido, direccion, telefono, cedula) VALUES (?,?,?,?,?)', 
            [nombre, apellido, direccion, telefono, cedula]
        );

        res.status(201).json({ id_empleado: result.insertId });
    } catch (error) {
        return res.status(500).json({
            message: 'Ha ocurrido un error al guardar los datos del empleado.',
            error: error
        });
    }
};

// Eliminar un empleado por su ID
export const eliminarEmpleado = async (req, res) => {
    try {
      const [result] = await pool.query('DELETE FROM empleados WHERE id_empleado = ?', [req.params.id]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({
          mensaje: `Error al eliminar el empleado. El ID ${req.params.id} no fue encontrado.`
        });
      }
  
      res.status(204).send(); // Respuesta sin contenido para indicar éxito
    } catch (error) {
      return res.status(500).json({
        mensaje: 'Ha ocurrido un error al eliminar el empleado.',
        error: error
      });
    }
  };
  
  // Actualizar un empleado por su ID (parcial o completa)
  export const actualizarEmpleado = async (req, res) => {
    try {
      const { id } = req.params;
      const datos = req.body;
  
      const [resultado] = await pool.query(
        'UPDATE empleados SET ? WHERE id_empleado = ?',
        [datos, id]
      );
  
      if (resultado.affectedRows === 0) {
        return res.status(404).json({
          mensaje: `El empleado con ID ${id} no existe.`,
        });
      }
  
      res.status(204).send(); // Respuesta sin contenido para indicar éxito
    } catch (error) {
        console.log("Error al actualizarempleado:", error);
      return res.status(500).json({
        mensaje: 'Error al actualizar el empleado.',
        error: error,
      });
    }
  };