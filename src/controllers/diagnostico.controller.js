import { pool } from '../db.js';

export const obtenerDiagnosticoConDetalles = async (req, res) => {
  try {
    const [result] = await pool.query(`
      SELECT 
        d.id_diag,
        dd.id_detallediag,
        CONCAT(c.nombre, ' ', c.apellido) AS cliente,
        CONCAT(eq.tipo, ' ', eq.marca, ' ', eq.color) AS equipo,
        d.descripcion,
        s.descripcion AS servicio,
        CONCAT(e.nombre, ' ', e.apellido) AS empleado,
        CONCAT('C$', dd.costo) AS precio
      FROM Diagnostico d
      INNER JOIN Clientes c ON d.id_cliente = c.id_cliente
      INNER JOIN Empleados e ON d.id_empleado = e.id_empleado
      INNER JOIN Detalle_diagnostico dd ON d.id_diag = dd.id_detallediag
      INNER JOIN EquipoComputarizado eq ON d.id_equipocomp = eq.id_equipocomp
      INNER JOIN Servicios s ON dd.id_ser = s.id_ser
    `);
    
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de los diagnósticos.',
      error: error
    });
  }
};