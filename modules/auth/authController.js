// ==================================================
// ||                 Импорты                      ||
// ==================================================
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AuthService from './authService.js'

// Регистрация
export const registerUser = async (req, res) => {

    // Получение с тела запрооса данных
    const { email, password, surname, name, patronymic } = req.body;

    try {

        // Создание нового пользователя
        const newUser = await AuthService.createUser(email, password, surname, name, patronymic);

        // Генерация jwt токена
        const token = AuthService.generateToken(newUser);
        // Генерация refresh токена
        const refreshToken = await AuthService.generateRefreshToken(newUser);

        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });
        res.status(201).json({ message: 'Успешаня регистрация', token });

    } catch (error) {
        if (error.message === "Пользователь уже существует") {
            res.status(409).json({ message: error.message });
        } else {
            console.error(error);
            res.status(400).json({ message: error.message });
        }
    }
}

// Авторизация
export const loginUser = async (req, res) => {
    // Из тела запроса берём email и password
    const { email, password } = req.body;
    try {
        // Проверка данных и получение токена и рефрештокена
        const { token, refreshToken } = await AuthService.loginUser( email, password );
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });
        res.json({ message: 'Авторизация успешна', token });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}

export const refreshToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ error: "Рефреш токен не найден" });
    }

    try {
        const newToken = await AuthService.refreshToken(refreshToken);
        res.json({ token: newToken });
    } catch (error) {
        res.status(401).json({ error: error.message })
    }
}

// Выход
export const logoutUser = async (req, res) => {
    const userId = req.body.userId;
    try {
        await AuthService.logoutUser(userId);
        res.clearCookie('refreshToken');
        res.status(200).json({ message: "Успешный выход" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при выходе" })
    }
}