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

// Obtener todas las ventas
export const obtenerDiagnosticos = async (req, res) => {
  try {
    const [result] = await pool.query(`
      SELECT 
        d.id_diag,
        CONCAT(c.nombre, ' ', c.apellido) AS cliente,
        CONCAT(eq.tipo, ' ', eq.marca, ' ', eq.modelo, ' ', eq.color) AS equipo,
        d.descripcion,
        CONCAT(e.nombre, ' ', e.apellido) AS empleado,
        COALESCE(SUM(dd.costo), 0) AS total
      FROM Diagnostico d
      INNER JOIN Clientes c ON d.id_cliente = c.id_cliente
      INNER JOIN Empleados e ON d.id_empleado = e.id_empleado
      INNER JOIN EquipoComputarizado eq ON d.id_equipocomp = eq.id_equipocomp
      LEFT JOIN Detalle_diagnostico dd ON d.id_diag = dd.id_diag
      GROUP BY 
        d.id_diag,
        c.nombre, c.apellido,
        eq.tipo, eq.marca, eq.modelo, eq.color,
        d.descripcion,
        e.nombre, e.apellido;
    `);
    
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de los diagnósticos.',
      error: error
    });
  }
};

// Eliminar un diagnóstico (los detalles se eliminan automáticamente por ON DELETE CASCADE)
export const eliminarDiagnostico = async (req, res) => {
  try {
    const { id_diag } = req.params;

    const [result] = await pool.query('DELETE FROM Diagnostico WHERE id_diag = ?', [id_diag]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Diagnóstico no encontrado' });
    }

    res.json({ mensaje: 'Diagnóstico y sus detalles eliminados correctamente' });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error al eliminar el diagnóstico',
      error: error.message
    });
  }
};

// Registrar un nuevo diagnóstico con detalles
export const registrarDiagnostico = async (req, res) => {
  const { descripcion, id_equipocomp, id_cliente, id_empleado, detalles } = req.body;

  try {
    const [diagnosticoResult] = await pool.query(
      'INSERT INTO Diagnostico (descripcion, id_equipocomp, id_cliente, id_empleado) VALUES (?, ?, ?, ?)',
      [descripcion, id_equipocomp, id_cliente, id_empleado]
    );

    const id_diag = diagnosticoResult.insertId;

    for (const detalle of detalles) {
      await pool.query(
        'INSERT INTO Detalle_diagnostico (costo, id_diag, id_ser) VALUES (?, ?, ?)',
        [detalle.costo, id_diag, detalle.id_ser]
      );
    }

    res.json({ mensaje: 'Diagnóstico registrado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar el diagnóstico', error: error.message });
  }
};

// Actualizar un diagnóstico con sus detalles
export const actualizarDiagnostico = async (req, res) => {
  const { id_diag } = req.params;
  const { descripcion, id_equipocomp, id_cliente, id_empleado, detalles } = req.body;

  try {

    // Actualizar diagnóstico
    const [diagnosticoResult] = await pool.query(
      'UPDATE Diagnostico SET descripcion = ?, id_equipocomp = ?, id_cliente = ?, id_empleado = ? WHERE id_diag = ?',
      [descripcion, id_equipocomp, id_cliente, id_empleado, id_diag]
    );

    if (diagnosticoResult.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Diagnóstico no encontrado' });
    }

    // Eliminar detalles actuales
    await pool.query('DELETE FROM Detalle_diagnostico WHERE id_diag = ?', [id_diag]);

    // Insertar nuevos detalles
    for (const detalle of detalles) {
      await pool.query(
        'INSERT INTO Detalle_diagnostico (costo, id_diag, id_ser) VALUES (?, ?, ?)',
        [detalle.costo, id_diag, detalle.id_ser]
      );
    }

    res.json({ mensaje: 'Diagnóstico actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el diagnóstico', error: error.message });
  }
};

// Obtener una venta específica por id_venta
export const obtenerDiagnosticoPorId = async (req, res) => {
  try {
    const { id_diag } = req.params;

    const [diagnostico] = await pool.query(`
      SELECT 
        id_diag,
        descripcion,
        id_equipocomp,
        id_cliente,
        id_empleado
      FROM Diagnostico
      WHERE id_diag = ?
    `, [id_diag]);

    if (diagnostico.length === 0) {
      return res.status(404).json({ mensaje: 'Diagnóstico no encontrado' });
    }

    res.json(diagnostico[0]); // Devuelve solo el primer objeto (un solo Diagnóstico)
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener los datos del Diagnóstico.',
      error: error.message
    });
  }
};
