import express from 'express';
import cors from 'cors';
import rutasClientes from './routes/clientes.routes.js';
import rutasEmpleados from './routes/empleados.routes.js';
import rutasUsuarios from './routes/usuarios.routes.js';
import rutasServicios from './routes/servicios.routes.js';
import rutasDiagnosticos from './routes/diagnostico.routes.js';
import rutasEquipos from './routes/equiposcomputarizados.routes.js';
import rutasEntregas from './routes/entregas.routes.js';
import rutasRecepciones from './routes/recepciones.routes.js';

const app = express();

// Habilitar CORS para cualquier origen
app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

app.use('/api', rutasClientes);
app.use('/api', rutasEmpleados);
app.use('/api', rutasUsuarios);
app.use('/api', rutasServicios);
app.use('/api', rutasDiagnosticos);
app.use('/api', rutasEquipos);
app.use('/api', rutasEntregas);
app.use('/api', rutasRecepciones);

// Manejo de rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({
    message: 'La ruta que ha especificado no se encuentra registrada.'
    });
});

export default app;