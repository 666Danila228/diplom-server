import BaseController from "../utils/baseController.js";
import AuthService from './authService.js';
import { registerSchema, loginSchema } from '../../validations/auth/index.js';
import { handleValidationError } from "../../validations/errorHandler.js";
import upload from "../../utils/upload.js";

class AuthController extends BaseController {
    // Регистрация пользователя
    async registerUser(req, res) {
        upload.single('avatar')(req, res, async (err) => {
            if (err) {
                console.error('Ошибка при загрузке файла:', err.message); // Логируем ошибку

            }

            const data = req.body;
            let avatarUrl = 'uploads/users/default-avatar.jpg';

            if (req.file) {
                avatarUrl = req.file.path;
            }

            const userData = {
                ...data,
                role_id: parseInt(data.role_id, 10),
                avatar: avatarUrl,
            };

            await super.createRecord(req, res, () => AuthService.createUser(userData), 'пользователь', registerSchema);
        });
    }

    // Авторизация пользователя
    async loginUser(req, res) {
        const { error, value } = loginSchema.validate(req.body, { abortEarly: false });

        if (error) {
            const errors = handleValidationError(error);
            return res.status(400).json({ errors });
        }

        const { email, password } = value;

        try {
            const { token, refreshToken, existingUser } = await AuthService.loginUser(email, password);
            res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });
            res.json({ message: 'Авторизация успешна', token, existingUser });
        } catch (error) {
            console.error('Ошибка при авторизации:', error);
            res.status(500).json({ error: error.message });
        }
    }

    // Проверка авторизации
    async checkAuth(req, res) {
        const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

        if (!token) {
            return res.status(401).json({ message: "Токен отсутствует" });
        }

        try {
            const user = await AuthService.checkAuth(token);
            res.status(200).json({ user });
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    }

    // Выход пользователя
    async logoutUser(req, res) {
        const userId = req.user.userId;
        try {
            await AuthService.logoutUser(userId);
            res.clearCookie('refreshToken');
            res.status(200).json({ message: "Успешный выход" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Ошибка при выходе" });
        }
    }

    // Обновление токена
    async refreshToken(req, res) {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({ error: "Рефреш токен не найден" });
        }

        try {
            const newToken = await AuthService.refreshToken(refreshToken);
            res.json({ token: newToken });
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    }
}

export default new AuthController();