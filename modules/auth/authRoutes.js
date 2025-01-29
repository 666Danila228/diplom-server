// ==================================================
// ||                 Импорты                      ||
// ==================================================
import express from 'express';
import checkAuthMiddleware from '../../utils/checkAuthMiddleware.js';
import AuthController from './authController.js';
import upload from '../../utils/upload.js';

// ==================================================
// ||                 Константы                    ||
// ==================================================
const router = express.Router();

// Пост запрос регистрации пользователя
router.post('/register', AuthController.registerUser);

// Пост запрос авторизации пользователя
router.post('/login', AuthController.loginUser);

// Гет запрос для проверки авторизации
router.get('/check-auth', checkAuthMiddleware, AuthController.checkAuth);

router.post('/refresh-token', AuthController.refreshToken);

// Пост запрос выхода из системы
router.post('/logout', checkAuthMiddleware, AuthController.logoutUser);

export default router;