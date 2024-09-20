// ==================================================
// ||                 Импорты                      ||
// ==================================================
import express from 'express';
import { registerUser } from './userController.js';

// ==================================================
// ||                 Константы                    ||
// ==================================================
const router = express.Router();

// Пост запрос регистрации пользователя
router.post('/register', registerUser);

// Пост запрос авторизации пользователя
router.post('/register', (req, res) => {
});

export default router;