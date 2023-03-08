import { Router } from 'express';
import {
    getAseguradoras,
    getAseguradora,
    postAseguradora,
    putAseguradora,
    deleteAseguradora,
} from '../controllers/aseguradora.controller.js';

const router = Router();

/* obtener todos los aseguradora */
router.get('/aseguradora', getAseguradoras);

/* obtener una aseguradora en especifico */
router.get('/aseguradora/:id', getAseguradora);

/* crear una aseguradora */
router.post('/aseguradora', postAseguradora);

/* actualizar una aseguradora */
router.patch('/aseguradora/:id', putAseguradora);

/* borrar una aseguradora */
router.delete('/aseguradora/:id', deleteAseguradora);

export default router;
