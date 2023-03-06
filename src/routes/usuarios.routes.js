import { Router } from 'express';
import {
    getUsuarios,
    postUsuarios,
    putUsuarios,
    deleteUsuarios,
    getUsuario
} from '../controllers/usuarios.controller.js';

const router = Router();

/* ruta para obetener todos los usuarios */
router.get('/usuarios', getUsuarios);

/* ruta para obetener un usuario en especifico (por ID) */
router.get('/usuarios/:id', getUsuario);

/* ruta para crear un usuario */
router.post('/usuarios', postUsuarios);

/* ruta para actualizar un usuario */
router.patch('/usuarios/:id', putUsuarios);

/* ruta para eliminar un usuario */
router.delete('/usuarios/:id', deleteUsuarios);

export default router;
