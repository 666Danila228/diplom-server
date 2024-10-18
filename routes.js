// ==================================================
// ||                 Импорты                      ||
// ==================================================
import express from 'express';
import authRoutes from "./modules/auth/authRoutes.js";
import userRoutes from "./modules/users/userRoutes.js";
import { authLimit } from './utils/rateLimit.js';


// ==================================================
// ||                 Константы                    ||
// ==================================================
const router = express.Router();

router.use('/auth', authLimit, authRoutes);

router.use('/user', userRoutes);

export default router;