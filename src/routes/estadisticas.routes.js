import { Router } from 'express';
import { DiagnosticosPorMes, GananciasMensuales, DiagnosticosPorEmpleados, DiagnosticosPorEmpleadosPorAño,
         DiagnosticosPorCliente, EquiposPorTipoyMarca, DiagnosticosPorEquipos, CantidadUsosPorServicio,
         GananciasTotalesPorServicios, EquiposIngresadosPorTipoyMarca, DiagnosticosPorDia,
         PromedioDiagnosticosPorEmpleados, DiagnosticosTotalesEIngresosPorTrimestreyAnio, 
         ClientesConMasDeTresDiagnosticos, ServiciosPorClientes, ClientesConMasDiagnosticosUltimoAnio,
         ServiciosMayorCostoPromedio, DiagnosticosPorMesesRecientes, DiagnosticosPorTrimestreyAnio,
         IngresosGeneradosPorEmpleado } from '../controllers/estadisticas.controller.js';

const router = Router();

// Ruta

router.get('/diagnosticospormes', DiagnosticosPorMes);

router.get('/gananciasmensuales', GananciasMensuales);

router.get('/diagnosticosporempleados', DiagnosticosPorEmpleados);

router.get('/diagnosticosporempleadosporanio', DiagnosticosPorEmpleadosPorAño);

router.get('/diagnosticosporcliente', DiagnosticosPorCliente);

router.get('/equiposportipoymarca', EquiposPorTipoyMarca);

router.get('/diagnosticosporequipos', DiagnosticosPorEquipos);

router.get('/cantidadusosporservicio', CantidadUsosPorServicio); 

router.get('/gananciastotalesporservicios', GananciasTotalesPorServicios);

router.get('/equiposingresadosportipoymarca', EquiposIngresadosPorTipoyMarca);

router.get('/diagnosticospordia', DiagnosticosPorDia);

router.get('/promediodiagnosticosporempleados', PromedioDiagnosticosPorEmpleados);

router.get('/diagnosticostotaleseingresosportrimestreyanio', DiagnosticosTotalesEIngresosPorTrimestreyAnio);

router.get('/clientesconmasdetresdiagnosticos', ClientesConMasDeTresDiagnosticos);

router.get('/serviciosporclientes', ServiciosPorClientes);

router.get('/clientesconmasdiagnosticosultimoanio', ClientesConMasDiagnosticosUltimoAnio);

router.get('/serviciosmayorcostopromedio', ServiciosMayorCostoPromedio);

router.get('/diagnosticosportrimestreyanio', DiagnosticosPorTrimestreyAnio);

router.get('/diagnosticospormesesrecientes', DiagnosticosPorMesesRecientes);

router.get('/ingresosgeneradosporempleado', IngresosGeneradosPorEmpleado);

export default router;