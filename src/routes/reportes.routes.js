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
router.get('/reportes', getReportes);

/* obtener un reporte en especifico */
router.get('/reportes/:id', getReporte);

/* crear un reporte */
router.post('/reportes', postReporte);

/* actualizar un reporte */
router.patch('/reportes/:id', putReporte);

/* borrar un reporte */
router.delete('reportes/:id', deleteReporte);

export default router;
