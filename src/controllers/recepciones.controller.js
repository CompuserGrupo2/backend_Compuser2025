import { pool } from '../db.js';

export const obtenerRecepciones = async (req, res) => {
  try {
    const [result] = await pool.query(`
      SELECT 
        r.id_recepcion,
        r.fecha,
        r.estado_recepcion,
        CONCAT(c.nombre, ' ', c.apellido) AS cliente,
        CONCAT(eq.tipo, ' ', eq.marca, ' ', eq.color) AS equipo,
        CONCAT(em.nombre, ' ', em.apellido) AS empleado
      FROM Recepcion r
      INNER JOIN Clientes c ON r.id_cliente = c.id_cliente
      INNER JOIN Empleados em ON r.id_empleado = em.id_empleado
      INNER JOIN EquipoComputarizado eq ON r.id_equipocomp = eq.id_equipocomp
    `);
    
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de las recepciones.',
      error: error
    });
  }
};