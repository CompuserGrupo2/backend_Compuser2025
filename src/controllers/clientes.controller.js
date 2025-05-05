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

// Eliminar un cliente por su ID
export const eliminarCliente = async (req, res) => {
    try {
      const [result] = await pool.query('DELETE FROM clientes WHERE id_cliente = ?', [req.params.id]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({
          mensaje: `Error al eliminar el cliente. El ID ${req.params.id} no fue encontrado.`
        });
      }
  
      res.status(204).send(); // Respuesta sin contenido para indicar éxito
    } catch (error) {
      return res.status(500).json({
        mensaje: 'Ha ocurrido un error al eliminar el cliente.',
        error: error
      });
    }
  };
  
  // Actualizar un cliente por su ID (parcial o completa)
  export const actualizarCliente = async (req, res) => {
    try {
      const { id } = req.params;
      const datos = req.body;
  
      const [resultado] = await pool.query(
        'UPDATE clientes SET ? WHERE id_cliente = ?',
        [datos, id]
      );
  
      if (resultado.affectedRows === 0) {
        return res.status(404).json({
          mensaje: `El cliente con ID ${id} no existe.`,
        });
      }
  
      res.status(204).send(); // Respuesta sin contenido para indicar éxito
    } catch (error) {
        console.log("Error al actualizarcliente:", error);
      return res.status(500).json({
        mensaje: 'Error al actualizar el cliente.',
        error: error,
      });
    }
  };