import { pool } from '../db.js';

export const obtenerRecepciones = async (req, res) => {
  try {
    const [result] = await pool.query(`
      SELECT 
        r.id_recepcion,
        r.fecha,
        r.estado_recepcion,
        CONCAT(c.nombre, ' ', c.apellido) AS cliente,
        CONCAT(eq.tipo, ' ', eq.marca, ' ', eq.modelo, ' ', eq.color) AS equipo,
        CONCAT(em.nombre, ' ', em.apellido) AS empleado
      FROM Recepcion r
      INNER JOIN Clientes c ON r.id_cliente = c.id_cliente
      INNER JOIN Empleados em ON r.id_empleado = em.id_empleado
      INNER JOIN EquipoComputarizado eq ON r.id_equipocomp = eq.id_equipocomp
      ORDER BY id_recepcion;
    `);
    
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de las recepciones.',
      error: error
    });
  }
};


export const registrarRecepcion = async (req, res) => {
  try {
    const { 
      fecha, 
      estado_recepcion, 
      id_cliente, 
      id_equipocomp, 
      id_empleado
    } = req.body;

    // Validación básica de campos requeridos
    if (!fecha || !estado_recepcion || !id_cliente || !id_equipocomp || !id_empleado) {
      return res.status(400).json({
        mensaje: 'Faltan campos requeridos.'
      });
    }

    const [result] = await pool.query(
      'INSERT INTO Recepcion (fecha, estado_recepcion, id_cliente, id_equipocomp, id_empleado) VALUES (?, ?, ?, ?, ?)',
      [
        fecha,
        estado_recepcion,
        id_cliente,
        id_equipocomp,
        id_empleado
      ]
    );

    res.status(201).json({ 
      id_entregaequipo: result.insertId,
      mensaje: 'Recepción registrada exitosamente'
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al registrar la recepción del equipo.',
      error: error.message
    });
  }
};

// Eliminar un equipo computarizado por su ID
export const eliminarRecepcion = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM Recepcion WHERE id_recepcion = ?', [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar la recepción del equipo. El ID ${req.params.id} no fue encontrado.`
      });
    }

    res.status(204).send(); // Eliminación exitosa, sin contenido
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al eliminar la recepción del equipo.',
      error: error
    });
  }
};

// Actualizar un empleado por su ID (parcial o completa)
export const actualizarRecepcion = async (req, res) => {
  try {
    const { id } = req.params;
    const datos = req.body;

    const [resultado] = await pool.query(
      'UPDATE Recepcion SET ? WHERE id_recepcion = ?',
      [datos, id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `La recepción con ID ${id} no existe.`,
      });
    }

    res.status(204).send(); // Respuesta sin contenido para indicar éxito
  } catch (error) {
      console.log("Error al actualizar recepcion:", error);
    return res.status(500).json({
      mensaje: 'Error al actualizar la recepcion.',
      error: error,
    });
  }
};