import { Router } from 'express';

import { postLogin, postRegister } from '../controllers/auth.controller.js';

const router = Router();

router.post('/login', postLogin)
router.post('/register', postRegister)

export default router