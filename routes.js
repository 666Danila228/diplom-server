// ==================================================
// ||                 Импорты                      ||
// ==================================================
import express from 'express';
import authRoutes from "./modules/auth/authRoutes.js";
import { authLimit } from './utils/rateLimit.js';


// ==================================================
// ||                 Константы                    ||
// ==================================================
const router = express.Router();

router.use('/auth', authLimit, authRoutes);

export default router;