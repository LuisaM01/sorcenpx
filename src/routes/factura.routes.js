import { Router } from 'express';
import {
    getFacturas,
    getFactura,
    postFactura,
    putFactura,
    deleteFactura,
} from '../controllers/factura.controller.js';

const router = Router();

/* obtener todos los aseguradora */
router.get('/factura', getFacturas);

/* obtener una aseguradora en especifico */
router.get('/factura/:id', getFactura);

/* crear una aseguradora */
router.post('/factura', postFactura);

/* actualizar una aseguradora */
router.patch('/factura/:id', putFactura);

/* borrar una aseguradora */
router.delete('/factura/:id', deleteFactura);

export default router;
