// ==================================================
// ||                 Импорты                      ||
// ==================================================
import express from 'express';
import authRoutes from "./modules/auth/authRoutes.js";
import userRoutes from "./modules/users/userRoutes.js";
import adminRoutes from "./modules/admin/adminRoutes.js";
import commonRoutes from "./modules/Common/commonRoutes.js";
import engineerRoutes from "./modules/engineer/engineerRoutes.js";
import { authLimit } from './utils/rateLimit.js';


// ==================================================
// ||                 Константы                    ||
// ==================================================
const router = express.Router();

router.use('/auth', authLimit, authRoutes);

router.use('/user', userRoutes);

router.use('/admin', adminRoutes);

router.use('/common', commonRoutes);

router.use('/engineer', engineerRoutes);

export default router;