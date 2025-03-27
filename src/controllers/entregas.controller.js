import { pool } from '../db.js';

export const obtenerEntregas = async (req, res) => {
  try {
    const [result] = await pool.query(`
      SELECT 
        en.id_entregaequipo,
        en.fecha,
        en.estado_entrega,
        CONCAT(c.nombre, ' ', c.apellido) AS cliente,
        CONCAT(eq.tipo, ' ', eq.marca, ' ', eq.color) AS equipo,
        CONCAT(em.nombre, ' ', em.apellido) AS empleado
      FROM Entrega_de_equipo en
      INNER JOIN Clientes c ON en.id_cliente = c.id_cliente
      INNER JOIN Empleados em ON en.id_empleado = em.id_empleado
      INNER JOIN EquipoComputarizado eq ON en.id_equipocomp = eq.id_equipocomp
    `);
    
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de las entregas.',
      error: error
    });
  }
};