import { Router } from 'express';
import {
    getVehiculos,
    getVehiculo,
    postVehiculo,
    putVehiculo,
    deleteVehiculo,
} from '../controllers/vehiculos.controller.js';

const router = Router();

/* obtener todos los vehiculos */
router.get('/vehiculos', getVehiculos);

/* obtener un vehiculo en especifico */
router.get('/vehiculos/:id', getVehiculo);

/* crear un vehiculo */
router.post('/vehiculos', postVehiculo);

/* actualizar un vehiculo */
router.patch('/vehiculos/:id', putVehiculo);

/* borrar un vehiculo */
router.delete('/vehiculos/:id', deleteVehiculo);

export default router;
