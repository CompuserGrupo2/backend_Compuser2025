import { pool } from '../db.js';

//Obtener todos los servicios
export const obtenerServicios = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM Servicios');
        res.json(result);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ha ocurrido un error al leer los datos de los Servicios.',
            error: error
        });
    }
};

//Obtener un Servicio por medio del ID
export const obtenerServicioID = async (req, res) => {
    try{
        const [result] = await pool.query('SELECT * FROM Servicios WHERE id_ser = ?', [req.params.id]);

        if(result.length <= 0){
            return res.status(404).json({
                message: `Error al leer los datos. Id ${id_ser} del servicio no encontrado.`
            });
        }
        res.json(result[0]);
    } catch (error){
        return res.status(500).json({
            message: 'Ha ocurrido un error al leer los datos del servicio.'
        });
    }
};

//Insertar un servicio
export const insertarServicio = async (req, res) => {
    try{
        const {descripcion, costo, imagen} = req.body;
        const [result] = await pool.query(
            'INSERT INTO Servicios (descripcion, costo, imagen) VALUES (?,?,?)', 
            [descripcion, costo, imagen]);
        res.status(201).json({ id_ser: result.insertId });
    } catch (error) {
        return res.status(500).json({
            message: 'Ha ocurrido un error al guardar los datos del servicio.',
            error: error
        });
    }
};

// Eliminar un servicio por su ID
export const eliminarServicio = async (req, res) => {
    try {
      const [result] = await pool.query('DELETE FROM servicios WHERE id_ser = ?', [req.params.id]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({
          mensaje: `Error al eliminar el servicio. El ID ${req.params.id} no fue encontrado.`
        });
      }
  
      res.status(204).send(); // Respuesta sin contenido para indicar éxito
    } catch (error) {
      return res.status(500).json({
        mensaje: 'Ha ocurrido un error al eliminar el servicio.',
        error: error
      });
    }
  };
  
  // Actualizar un servicio por su ID (parcial o completa)
  export const actualizarServicio = async (req, res) => {
    try {
      const { id } = req.params;
      const datos = req.body;
  
      const [resultado] = await pool.query(
        'UPDATE servicios SET ? WHERE id_ser = ?',
        [datos, id]
      );
  
      if (resultado.affectedRows === 0) {
        return res.status(404).json({
          mensaje: `El servicio con ID ${id} no existe.`,
        });
      }
  
      res.status(204).send(); // Respuesta sin contenido para indicar éxito
    } catch (error) {
        console.log("Error al actualizarservicio:", error);
      return res.status(500).json({
        mensaje: 'Error al actualizar el servicio.',
        error: error,
      });
    }
  };