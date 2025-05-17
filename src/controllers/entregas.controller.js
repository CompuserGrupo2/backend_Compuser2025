import { pool } from '../db.js';

export const obtenerEntregas = async (req, res) => {
  try {
    const [result] = await pool.query(`
      SELECT 
        en.id_entregaequipo,
        en.fecha,
        en.estado_entrega,
        CONCAT(c.nombre, ' ', c.apellido) AS cliente,
        CONCAT(eq.tipo, ' ', eq.marca, ' ', eq.modelo, ' ', eq.color) AS equipo,
        CONCAT(em.nombre, ' ', em.apellido) AS empleado
      FROM Entrega_de_equipo en
      INNER JOIN Clientes c ON en.id_cliente = c.id_cliente
      INNER JOIN Empleados em ON en.id_empleado = em.id_empleado
      INNER JOIN EquipoComputarizado eq ON en.id_equipocomp = eq.id_equipocomp
      ORDER BY id_entregaequipo;
    `);
    
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de las entregas.',
      error: error
    });
  }
};


export const registrarEntrega = async (req, res) => {
  try {
    const { 
      fecha, 
      estado_entrega, 
      id_equipocomp, 
      id_cliente, 
      id_empleado
    } = req.body;

    // Validación básica de campos requeridos
    if (!fecha || !estado_entrega || !id_equipocomp || !id_cliente || !id_empleado) {
      return res.status(400).json({
        mensaje: 'Faltan campos requeridos.'
      });
    }

    const [result] = await pool.query(
      'INSERT INTO Entrega_de_equipo (fecha, estado_entrega, id_equipocomp, id_cliente, id_empleado) VALUES (?, ?, ?, ?, ?)',
      [
        fecha,
        estado_entrega,
        id_equipocomp,
        id_cliente,
        id_empleado
      ]
    );

    res.status(201).json({ 
      id_entregaequipo: result.insertId,
      mensaje: 'Entrega registrada exitosamente'
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al registrar la entrega.',
      error: error.message
    });
  }
};

// Eliminar un equipo computarizado por su ID
export const eliminarEntrega = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM Entrega_de_equipo WHERE id_entregaequipo = ?', [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar la entrega. El ID ${req.params.id} no fue encontrado.`
      });
    }

    res.status(204).send(); // Eliminación exitosa, sin contenido
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al eliminar la entrega del equipo.',
      error: error
    });
  }
};

// Actualizar un empleado por su ID (parcial o completa)
export const actualizarEntrega = async (req, res) => {
  try {
    const { id } = req.params;
    const datos = req.body;

    const [resultado] = await pool.query(
      'UPDATE Entrega_de_equipo SET ? WHERE id_entregaequipo = ?',
      [datos, id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `La entrega con ID ${id} no existe.`,
      });
    }

    res.status(204).send(); // Respuesta sin contenido para indicar éxito
  } catch (error) {
      console.log("Error al actualizar entrega:", error);
    return res.status(500).json({
      mensaje: 'Error al actualizar la entrega.',
      error: error,
    });
  }
};