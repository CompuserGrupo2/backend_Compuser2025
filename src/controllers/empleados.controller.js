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

//Eliminar un empleado
export const eliminarEmpleado = async (req, res) => {
    try{
        const {id} = req.params;
        const [result] = await pool.query('DELETE FROM Empleados WHERE id_empleado = ?', [id]);
        console.log(result);

        if(result.affectedRows <= 0){
            return res.status(404).json({
                message: `Error al eliminar. Empleado con id ${id_empleado} no encontrado.`
            });
        } else{
            return res.status(200).json({
                message: `Los datos del empleado con id ${id_empleado} se han eliminado exitosamente.`
            });
        }
    } catch (error){
        return res.status(500).json({
            message: 'Ha ocurrido un error el eliminar los datos del empleado.'
        });
    }
};

//Actualizar un empleado
export const actualizarEmpleado = async (req, res) => {
    try{
        //throw new Error ('Error al actualizar.');
        const {id} = req.params;
        const {nombre, apellido, direccion, telefono, cedula} = req.body;

        const [result] = await pool.query('UPDATE Empleados SET nombre = IFNULL(?, nombre), apellido = IFNULL(?, apellido), direccion = IFNULL(?, direccion), telefono = IFNULL(?, telefono), cedula = IFNULL(?, cedula) WHERE id_empleado = ?', [nombre, apellido, direccion, telefono, cedula]);

        if(result.affectedRows === 0){
            return res.status(404).json({
                message: `Error al actualizar. Empleado con id ${id_empleado} no encontrado.`
            });
        }

        const [rows] = await pool.query('SELECT * FROM Empleados WHERE id_empleado = ?', [id])

        console.log(result);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'Ha ocurrido un error al actualizar los datos del empleado.'
        });
    }
};