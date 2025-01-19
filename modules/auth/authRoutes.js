// ==================================================
// ||                 Импорты                      ||
// ==================================================
import express from 'express';
import { loginUser, logoutUser, refreshToken, checkAuth } from './authController.js';
import checkAuthMiddleware from '../../utils/checkAuthMiddleware.js';
import AuthController from './authController.js';

// ==================================================
// ||                 Константы                    ||
// ==================================================
const router = express.Router();

// Пост запрос регистрации пользователя
router.post('/register', AuthController.registerUser);

// Пост запрос авторизации пользователя
router.post('/login', loginUser);

// Гет запрос для проверки авторизации
router.get('/check-auth', checkAuthMiddleware, checkAuth);

router.post('/refresh-token', refreshToken);

// Пост запрос выхода из системы
router.post('/logout', checkAuthMiddleware, logoutUser);

export default router;