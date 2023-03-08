import { Router } from 'express';
import {
    getEntrada_salidas,
    getEntrada_salida,
    postEntrada_salida,
    putEntrada_salida,
    deleteEntrada_salida
} from '../controllers/entrada_salida.controller.js';

const router = Router();

/* ruta para obetener todos las entrada y salidas */
router.get('/entrada-salida', getEntrada_salidas);

/* ruta para obetener una entrada y salidas en especifico (por ID) */
router.get('/entrada-salida/:id', getEntrada_salida);

/* ruta para crear una entrada y salidas */
router.post('/entrada-salida', postEntrada_salida);

/* ruta para actualizar una entrada y salidas */
router.patch('/entrada-salida/:id', putEntrada_salida);

/* ruta para eliminar una entrada y salidas */
router.delete('/entrada-salida/:id', deleteEntrada_salida);

export default router;
