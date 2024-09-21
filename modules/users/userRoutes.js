// ==================================================
// ||                 Импорты                      ||
// ==================================================
import express from 'express';
import { registerUser, loginUser } from './userController.js';

// ==================================================
// ||                 Константы                    ||
// ==================================================
const router = express.Router();

// Пост запрос регистрации пользователя
router.post('/register', registerUser);

// Пост запрос авторизации пользователя
router.post('/login', loginUser);

export default router;