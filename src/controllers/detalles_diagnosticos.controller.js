import { pool } from '../db.js';

// Controlador para obtener los detalles de una venta por id_venta
export const obtenerDetallesDiagnostico = async (req, res) => {
  const { id } = req.params; // Obtiene el id de los parámetros de la URL
  try {
    const [result] = await pool.query(
      `
      SELECT 
        dd.id_detallediag,
        dd.id_diag,
        s.descripcion AS servicio,
        dd.costo
      FROM Detalle_diagnostico dd
      INNER JOIN Servicios s ON dd.id_ser = s.id_ser
      WHERE dd.id_diag = ?;
    `,
      [id]
    );

    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron detalles para este diagnóstico.',
      });
    }

    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener los detalles del diagnóstico.',
      error: error.message,
    });
  }
};