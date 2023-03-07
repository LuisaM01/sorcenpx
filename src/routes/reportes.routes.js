import { Router } from 'express';
import {
    getReportes,
    getReporte,
    postReporte,
    putReporte,
    deleteReporte,
} from '../controllers/reportes.controller.js';

const router = Router();

/* obtener todos los reportes */
router.get('/Reportes', getReportes);

/* obtener un reporte en especifico */
router.get('/Reportes/:id', getReporte);

/* crear un reporte */
router.post('/Reportes', postReporte);

/* actualizar un reporte */
router.patch('/Reportes/:id', putReporte);

/* borrar un reporte */
router.delete('/Reportes/:id', deleteReporte);

export default router;
