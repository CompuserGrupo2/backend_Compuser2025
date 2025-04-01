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
        const {descripcion, costo} = req.body;
        const [result] = await pool.query(
            'INSERT INTO Servicios (descripcion, costo) VALUES (?,?)', 
            [descripcion, costo]);
        res.status(201).json({ id_ser: result.insertId });
    } catch (error) {
        return res.status(500).json({
            message: 'Ha ocurrido un error al guardar los datos del servicio.',
            error: error
        });
    }
};

//Eliminar un servicio
export const eliminarServicio = async (req, res) => {
    try{
        const {id} = req.params;
        const [result] = await pool.query('DELETE FROM Servicios WHERE id_ser = ?', [id]);
        console.log(result);

        if(result.affectedRows <= 0){
            return res.status(404).json({
                message: `Error al eliminar. Servicio con id ${id_ser} no encontrado.`
            });
        } else{
            return res.status(200).json({
                message: `Los datos del servicio con id ${id_ser} se han eliminado exitosamente.`
            });
        }
    } catch (error){
        return res.status(500).json({
            message: 'Ha ocurrido un error el eliminar los datos del servicio.'
        });
    }
};

//Actualizar un servicio
export const actualizarServicio = async (req, res) => {
    try{
        //throw new Error ('Error al actualizar.');
        const {id} = req.params;
        const {descripcion, costo} = req.body;

        const [result] = await pool.query('UPDATE Servicios SET descripcion = IFNULL(?, descripcion), costo = IFNULL(?, costo) WHERE id_ser = ?', [descripcion, costo]);

        if(result.affectedRows === 0){
            return res.status(404).json({
                message: `Error al actualizar. Servicio con id ${id_ser} no encontrado.`
            });
        }

        const [rows] = await pool.query('SELECT * FROM Servicios WHERE id_ser = ?', [id])

        console.log(result);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'Ha ocurrido un error al actualizar los datos del servicio.'
        });
    }
};