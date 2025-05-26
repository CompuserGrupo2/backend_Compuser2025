import { pool2 } from '../db.js';

// Obtener el total de diagnósticos por mes
export const DiagnosticosPorMes = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT 
        dt.mes,               
        dt.año,               
        COUNT(DISTINCT hd.id_diag) AS total_diagnosticos     
      FROM Hecho_Diagnostico hd
      JOIN Dim_Tiempo dt ON hd.fecha = dt.fecha
      GROUP BY dt.año, dt.mes
      ORDER BY dt.año, dt.mes;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadisticas de Diagnosticos.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener  las estadisticas de Diagnosticos.',
      error: error.message,
    });
  }
};

// Obtener ganancias mensuales
export const GananciasMensuales = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT 
          dt.mes,
          dt.año,
          SUM(hd.costo) AS ingresos_mensuales
      FROM Hecho_Diagnostico hd
      JOIN Dim_Tiempo dt ON hd.fecha = dt.fecha
      GROUP BY dt.año, dt.mes
      ORDER BY dt.año, dt.mes;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadisticas de Diagnosticos.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener  las estadisticas de Diagnosticos.',
      error: error.message,
    });
  }
};

// Obtener el diagnósticos por empleados
export const DiagnosticosPorEmpleados = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT 
        e.nombre,
        e.apellido,
        COUNT(DISTINCT hd.id_diag) AS total_diagnosticos
      FROM Dim_Empleado e
      LEFT JOIN Hecho_Diagnostico hd ON e.id_empleado = hd.id_empleado
      GROUP BY e.id_empleado;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadisticas de Diagnosticos.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener  las estadisticas de Diagnosticos.',
      error: error.message,
    });
  }
};

// Obtener diagnósticos por empleados por año
export const DiagnosticosPorEmpleadosPorAño = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT 
        e.nombre,
        e.apellido,
        dt.año,
        COUNT(DISTINCT hd.id_diag) AS total_diagnosticos
      FROM Dim_Empleado e
      JOIN Hecho_Diagnostico hd ON e.id_empleado = hd.id_empleado
      JOIN Dim_Tiempo dt ON hd.fecha = dt.fecha
      GROUP BY e.id_empleado, dt.año
      ORDER BY e.nombre, dt.año;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadisticas de Diagnosticos.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener  las estadisticas de Diagnosticos.',
      error: error.message,
    });
  }
};

// Obtener diagnósticos por cliente
export const DiagnosticosPorCliente = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT 
        c.nombre,
        c.apellido,
        COUNT(DISTINCT hd.id_diag) AS total_diagnosticos
      FROM Dim_Cliente c
      LEFT JOIN Hecho_Diagnostico hd ON c.id_cliente = hd.id_cliente
      GROUP BY c.id_cliente;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadisticas de Diagnosticos.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener  las estadisticas de Diagnosticos.',
      error: error.message,
    });
  }
};

// Obtener equipos por tipo y marca
export const EquiposPorTipoyMarca = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT 
        tipo,
        marca,
        COUNT(*) AS cantidad
      FROM Dim_Equipo_Computarizado
      GROUP BY tipo, marca;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadisticas de Diagnosticos.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener  las estadisticas de Diagnosticos.',
      error: error.message,
    });
  }
};

// Obtener diagnósticos por equipos
export const DiagnosticosPorEquipos = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT 
        ec.tipo,
        ec.marca,
        ec.modelo,
        COUNT(DISTINCT hd.id_diag) AS total_diagnosticos
      FROM Dim_Equipo_Computarizado ec
      JOIN Hecho_Diagnostico hd ON ec.id_equipocomp = hd.id_equipocomp
      GROUP BY ec.id_equipocomp;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadisticas de Diagnosticos.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener  las estadisticas de Diagnosticos.',
      error: error.message,
    });
  }
};

// Obtener cuantas veces se utilizo un servicio
export const CantidadUsosPorServicio = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT 
        s.descripcion,
        COUNT(hd.id_ser) AS veces_utilizado
      FROM Dim_Servicio s
      JOIN Hecho_Diagnostico hd ON s.id_ser = hd.id_ser
      GROUP BY s.id_ser
      ORDER BY veces_utilizado DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadisticas de Diagnosticos.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener  las estadisticas de Diagnosticos.',
      error: error.message,
    });
  }
};

// Obtener ganancias totales por servicios
export const GananciasTotalesPorServicios = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT 
        s.descripcion,
        SUM(hd.costo) AS ingreso_total
      FROM Dim_Servicio s
      JOIN Hecho_Diagnostico hd ON s.id_ser = hd.id_ser
      GROUP BY s.id_ser
      ORDER BY ingreso_total DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadisticas de Diagnosticos.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener  las estadisticas de Diagnosticos.',
      error: error.message,
    });
  }
};

// Obtener equipos ingresados por tipo y marca
export const EquiposIngresadosPorTipoyMarca = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT 
        ec.tipo,
        ec.marca,
        COUNT(DISTINCT hd.id_equipocomp) AS total_ingresados
      FROM Dim_Equipo_Computarizado ec
      JOIN Hecho_Diagnostico hd ON ec.id_equipocomp = hd.id_equipocomp
      GROUP BY ec.tipo, ec.marca;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadisticas de Diagnosticos.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener  las estadisticas de Diagnosticos.',
      error: error.message,
    });
  }
};

// Obtener diagnósticos por dia
export const DiagnosticosPorDia = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT
        dt.dia_semana,
        COUNT(DISTINCT hd.id_diag) AS total_diagnosticos
      FROM Hecho_Diagnostico hd
      JOIN Dim_Tiempo dt ON hd.fecha = dt.fecha
      GROUP BY dt.dia_semana
      ORDER BY FIELD(dt.dia_semana, 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo');`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadisticas de Diagnosticos.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener  las estadisticas de Diagnosticos.',
      error: error.message,
    });
  }
};

// Obtener promedio de diagnósticos por empleados
export const PromedioDiagnosticosPorEmpleados = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT 
        e.nombre,
        e.apellido,
        ROUND(COUNT(DISTINCT hd.id_diag) * 1.0 / COUNT(DISTINCT dt.mes), 2) AS promedio_mensual
      FROM Dim_Empleado e
      JOIN Hecho_Diagnostico hd ON e.id_empleado = hd.id_empleado
      JOIN Dim_Tiempo dt ON hd.fecha = dt.fecha
      GROUP BY e.id_empleado;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadisticas de Diagnosticos.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener  las estadisticas de Diagnosticos.',
      error: error.message,
    });
  }
};

// Obtener sumatoria de diagnósticos y suma ingresos por trimestre y año
export const DiagnosticosTotalesEIngresosPorTrimestreyAnio = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT
        dt.año,
        dt.trimestre,
        COUNT(DISTINCT hd.id_diag) AS total_diagnosticos,
        SUM(hd.costo) AS ingresos_totales
      FROM Hecho_Diagnostico hd
      JOIN Dim_Tiempo dt ON hd.fecha = dt.fecha
      GROUP BY dt.año, dt.trimestre
      ORDER BY dt.año, dt.trimestre;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadisticas de Diagnosticos.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener  las estadisticas de Diagnosticos.',
      error: error.message,
    });
  }
};

// Obtener clientes con más de tres diagnósticos
export const ClientesConMasDeTresDiagnosticos = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT 
        c.nombre,
        c.apellido,
        COUNT(DISTINCT hd.id_diag) AS total_diagnosticos
      FROM Dim_Cliente c
      JOIN Hecho_Diagnostico hd ON c.id_cliente = hd.id_cliente
      GROUP BY c.id_cliente
      HAVING COUNT(DISTINCT hd.id_diag) > 3;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadisticas de Diagnosticos.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener  las estadisticas de Diagnosticos.',
      error: error.message,
    });
  }
};

// Muestra qué servicios ha recibido cada cliente y cuántas veces
export const ServiciosPorClientes = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT 
        c.nombre,
        c.apellido,
        s.descripcion,
        COUNT(*) AS veces_utilizado
      FROM Dim_Cliente c
      JOIN Hecho_Diagnostico hd ON c.id_cliente = hd.id_cliente
      JOIN Dim_Servicio s ON hd.id_ser = s.id_ser
      GROUP BY c.id_cliente, s.id_ser
      ORDER BY c.nombre, veces_utilizado DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadisticas de Diagnosticos.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener  las estadisticas de Diagnosticos.',
      error: error.message,
    });
  }
};

// Muestra los clientes con más diagnósticos realizados en el último año disponible
export const ClientesConMasDiagnosticosUltimoAnio = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT 
        c.nombre,
        c.apellido,
        COUNT(DISTINCT hd.id_diag) AS total_diagnosticos_ultimo_anio
      FROM Dim_Cliente c
      JOIN Hecho_Diagnostico hd ON c.id_cliente = hd.id_cliente
      JOIN Dim_Tiempo dt ON hd.fecha = dt.fecha
      WHERE dt.año = (SELECT MAX(año) FROM Dim_Tiempo)
      GROUP BY c.id_cliente
      ORDER BY total_diagnosticos_ultimo_anio DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadisticas de Diagnosticos.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener  las estadisticas de Diagnosticos.',
      error: error.message,
    });
  }
};

// Muestra los servicios con mayor costo promedio
export const ServiciosMayorCostoPromedio = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT 
        (s.descripcion) AS servicios,
        AVG(hd.costo) AS costo_promedio
      FROM Dim_Servicio s
      JOIN Hecho_Diagnostico hd ON s.id_ser = hd.id_ser
      GROUP BY s.id_ser
      ORDER BY costo_promedio DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadisticas de Diagnosticos.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener  las estadisticas de Diagnosticos.',
      error: error.message,
    });
  }
};

// Muestra cuántos diagnósticos se han hecho por cada mes del año más reciente disponible
export const DiagnosticosPorMesesRecientes = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT 
        dt.nombre_mes,
        COUNT(DISTINCT hd.id_diag) AS total_diagnosticos
      FROM Hecho_Diagnostico hd
      JOIN Dim_Tiempo dt ON hd.fecha = dt.fecha
      WHERE dt.año = (SELECT MAX(año) FROM Dim_Tiempo)
      GROUP BY dt.mes, dt.nombre_mes
      ORDER BY dt.mes;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadisticas de Diagnosticos.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener  las estadisticas de Diagnosticos.',
      error: error.message,
    });
  }
};

// Muestra diagnósticos por trimestre y año
export const DiagnosticosPorTrimestreyAnio = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT
      dt.año,
      dt.trimestre,
      COUNT(DISTINCT hd.id_diag) AS total_diagnosticos_trimestre
    FROM Hecho_Diagnostico hd
    JOIN Dim_Tiempo dt ON hd.fecha = dt.fecha
    GROUP BY dt.año, dt.trimestre
    ORDER BY dt.año, dt.trimestre;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadisticas de Diagnosticos.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener  las estadisticas de Diagnosticos.',
      error: error.message,
    });
  }
};

// Muestra el total de ingresos generados por cada empleado a través de los diagnósticos realizados
export const IngresosGeneradosPorEmpleado = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT
        e.nombre,
        e.apellido,
        SUM(hd.costo) AS total_ingresos_generados
      FROM Dim_Empleado e
      JOIN Hecho_Diagnostico hd ON e.id_empleado = hd.id_empleado
      GROUP BY e.id_empleado
      ORDER BY total_ingresos_generados DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadisticas de Diagnosticos.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener  las estadisticas de Diagnosticos.',
      error: error.message,
    });
  }
};