import { pool } from '../db.js';

// Obtener promedio de calificaciones por servicio
export const obtenerPromedioPorServicio = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query(
      'SELECT AVG(calidad_servicio) as promedio FROM Calificaciones WHERE id_ser = ?',
      [id]
    );

    let promedio = result[0].promedio;

    if (promedio !== null) {
      promedio = parseFloat(promedio).toFixed(1); // Redondea solo si hay valor
    } else {
      promedio = null; // o podrías usar 0 o "Sin calificaciones"
    }

    res.json({ promedio });
  } catch (error) {
    console.error('Error al obtener promedio:', error);
    return res.status(500).json({ mensaje: 'Error al calcular el promedio.', error });
  }
};


// Registrar una calificación (Cliente)
export const registrarCalificacion = async (req, res) => {
  try {
    const { calidad_servicio, comentario, id_cliente, id_ser } = req.body;
    const fecha_calificacion = new Date();

    await pool.query(
      `INSERT INTO Calificaciones 
        (calidad_servicio, fecha_calificacion, comentario, id_cliente, id_ser) 
       VALUES (?, ?, ?, ?, ?)`,
      [calidad_servicio, fecha_calificacion, comentario, id_cliente, id_ser]
    );

    res.status(201).json({ mensaje: 'Calificación registrada con éxito' });
  } catch (error) {
    console.error('Error al registrar calificación:', error);
    res.status(500).json({ mensaje: 'Error al registrar calificación' });
  }
};

// Responder a una calificación (Empleado)
export const responderCalificacion = async (req, res) => {
  try {
    const { id } = req.params; // id_cali
    const { respuesta } = req.body;

    const [result] = await pool.query(
      `UPDATE Calificaciones 
       SET respuesta_calificacion = ? 
       WHERE id_cali = ?`,
      [respuesta, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Calificación no encontrada' });
    }

    res.json({ mensaje: 'Respuesta enviada correctamente' });
  } catch (error) {
    console.error('Error al responder calificación:', error);
    res.status(500).json({ mensaje: 'Error al responder calificación' });
  }
};

//Para obtener las calificaciones por servicio
export const obtenerCalificacionesPorServicio = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(
      `SELECT 
         c.id_cali, 
         c.calidad_servicio, 
         c.fecha_calificacion,
         c.comentario, 
         c.respuesta_calificacion, 
         CONCAT(cl.nombre, ' ', cl.apellido) AS nombre_cliente,
       FROM Calificaciones c
       JOIN Clientes cl ON c.id_cliente = cl.id_cliente
       WHERE c.id_ser = ?`,
      [id]
    );

    res.json(rows);
  } catch (error) {
    console.error('Error al obtener calificaciones:', error);
    res.status(500).json({ mensaje: 'Error al obtener calificaciones.' });
  }
};

//Para obtener las calificaciones
export const obtenerTodasLasCalificaciones = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        c.id_cali,
        CONCAT(cli.nombre, ' ', cli.apellido) AS cliente,
        s.descripcion AS servicio,
        c.calidad_servicio,
        c.comentario,
        c.respuesta_calificacion,
        c.fecha_calificacion
      FROM Calificaciones c
      JOIN Clientes cli ON c.id_cliente = cli.id_cliente
      JOIN Servicios s ON c.id_ser = s.id_ser
      ORDER BY c.fecha_calificacion DESC
    `);
    
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener calificaciones:", error);
    res.status(500).json({ mensaje: "Error del servidor" });
  }
};