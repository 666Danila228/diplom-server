// ==================================================
// ||                 Импорты                      ||
// ==================================================
import express from 'express';
import { registerUser, loginUser, logoutUser, refreshToken } from './authController.js';
import checkAuthMiddleware from '../../utils/checkAuthMiddleware.js';

// ==================================================
// ||                 Константы                    ||
// ==================================================
const router = express.Router();

// Пост запрос регистрации пользователя
router.post('/register', registerUser);

// Пост запрос авторизации пользователя
router.post('/login', loginUser);

router.post('/refresh-token', refreshToken);

// Пост запрос выхода из системы
router.post('/logout', checkAuthMiddleware, logoutUser);

export default router;