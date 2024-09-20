// ==================================================
// ||                 Импорты                      ||
// ==================================================
import express from 'express';
import userRoutes from './modules/users/userRoutes.js';


// ==================================================
// ||                 Константы                    ||
// ==================================================
const router = express.Router();

router.use('/users', userRoutes);

export default router;