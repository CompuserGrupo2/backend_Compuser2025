import { pool } from '../db.js';

//Obtener todos los clientes
export const obtenerClientes = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM Clientes');
        res.json(result);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ha ocurrido un error al leer los datos de los clientes.',
            error: error
        });
    }
};

//Obtener un cliente por medio del ID
export const obtenerClienteID = async (req, res) => {
    try{
        const [result] = await pool.query('SELECT * FROM Clientes WHERE id_cliente = ?', [req.params.id]);

        if(result.length <= 0){
            return res.status(404).json({
                message: `Error al leer los datos. Id ${id_cliente} de cliente no encontrado`
            });
        }
        res.json(result[0]);
    } catch (error){
        return res.status(500).json({
            message: 'Ha ocurrido un error al leer los datos del cliente.'
        });
    }
};

//Insertar un cliente
export const insertarCliente = async (req, res) => {
    try{
        const {nombre, apellido, direccion, tipo_cli, telefono, cedula} = req.body;
        const [result] = await pool.query(
            'INSERT INTO Clientes (nombre, apellido, direccion, tipo_cli, telefono, cedula) VALUES (?,?,?,?,?,?)',
            [nombre, apellido, direccion, tipo_cli, telefono, cedula]
        );

        res.status(201).json({ id_cliente: result.insertId });
    } catch (error) {
        return res.status(500).json({
            message: 'Ha ocurrido un error al guardar los datos del cliente.',
            error: error
        });
    }
};

//Eliminar un cliente
export const eliminarCliente = async (req, res) => {
    try{
        const {id} = req.params;
        const [result] = await pool.query('DELETE FROM Clientes WHERE id_cliente = ?', [id]);
        console.log(result);

        if(result.affectedRows <= 0){
            return res.status(404).json({
                message: `Error al eliminar. Cliente con id ${id_cliente} no encontrado.`
            });
        } else{
            return res.status(200).json({
                message: `Los datos del cliente con id ${id_cliente} se han eliminado exitosamente.`
            });
        }
    } catch (error){
        return res.status(500).json({
            message: 'Ha ocurrido un error el eliminar los datos del cliente.'
        });
    }
};

//Actualizar un cliente
export const actualizarCliente = async (req, res) => {
    try{
        //throw new Error ('Error al actualizar.');
        const {id} = req.params;
        const {nombre, apellido, direccion, tipo_cli, telefono, cedula} = req.body;

        const [result] = await pool.query('UPDATE Clientes SET nombre = IFNULL(?, nombre), apellido = IFNULL(?, apellido), direccion = IFNULL(?, direccion), tipo_cli = IFNULL(?, tipo_cli), telefono = IFNULL(?, telefono), cedula = IFNULL(?, cedula) WHERE id_cliente = ?', [nombre, apellido, direccion, tipo_cli, telefono, cedula]);

        if(result.affectedRows === 0){
            return res.status(404).json({
                message: `Error al actualizar. Empleado con id ${id_cliente} no encontrado.`
            });
        }

        const [rows] = await pool.query('SELECT * FROM Clientes WHERE id_cliente = ?', [id])

        console.log(result);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'Ha ocurrido un error al actualizar los datos del cliente.'
        });
    }
};