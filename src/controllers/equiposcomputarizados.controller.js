import { pool } from '../db.js';

export const obtenerEquipos = async (req, res) => {
  try {
    const [result] = await pool.query(`
      SELECT 
        e.id_equipocomp,
        e.tipo,
        e.marca,
        e.color,
        e.modelo,
        CONCAT(c.nombre, ' ', c.apellido) AS cliente
      FROM EquipoComputarizado e
      INNER JOIN Clientes c ON e.id_cliente = c.id_cliente
    `);
    
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de los equipos computarizados.',
      error: error
    });
  }
};