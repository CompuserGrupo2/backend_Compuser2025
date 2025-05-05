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

// Registrar un nuevo producto
export const registrarEquipo = async (req, res) => {
  try {
    const { 
      tipo, 
      marca, 
      color, 
      modelo, 
      id_cliente
    } = req.body;

    // Validación básica de campos requeridos
    if (!tipo || !marca || !color || !modelo || !id_cliente) {
      return res.status(400).json({
        mensaje: 'Faltan campos requeridos.'
      });
    }

    const [result] = await pool.query(
      'INSERT INTO EquipoComputarizado (tipo, marca, color, modelo, id_cliente) VALUES (?, ?, ?, ?, ?)',
      [
        tipo,
        marca,
        color,
        modelo,
        id_cliente
      ]
    );

    res.status(201).json({ 
      id_equipocomp: result.insertId,
      mensaje: 'Equipo Computarizado registrado exitosamente'
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al registrar el equipo computarizado.',
      error: error.message
    });
  }
};

// Eliminar un equipo computarizado por su ID
export const eliminarEquipo = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM EquipoComputarizado WHERE id_equipocomp = ?', [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar el equipo. El ID ${req.params.id} no fue encontrado.`
      });
    }

    res.status(204).send(); // Eliminación exitosa, sin contenido
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al eliminar el equipo computarizado.',
      error: error
    });
  }
};

// Actualizar un empleado por su ID (parcial o completa)
export const actualizarEquipo = async (req, res) => {
  try {
    const { id } = req.params;
    const datos = req.body;

    const [resultado] = await pool.query(
      'UPDATE EquipoComputarizado SET ? WHERE id_equipocomp = ?',
      [datos, id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `El Equipo con ID ${id} no existe.`,
      });
    }

    res.status(204).send(); // Respuesta sin contenido para indicar éxito
  } catch (error) {
      console.log("Error al actualizar equipo:", error);
    return res.status(500).json({
      mensaje: 'Error al actualizar el equipo.',
      error: error,
    });
  }
};