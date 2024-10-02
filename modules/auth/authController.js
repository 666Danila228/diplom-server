// ==================================================
// ||                 Импорты                      ||
// ==================================================
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AuhService from './authService.js'

// Регистрация
export const registerUser = async (req, res) => {

    // Получение с тела запрооса данных
    const { email, password, surname, name, patronymic } = req.body;

    try {

        // Создание нового пользователя
        const newUser = await AuhService.createUser(email, password, surname, name, patronymic);

        // Генерация jwt токена
        const token = AuhService.generateToken(newUser);

        // Генерация refresh токена
        const refreshToken = await AuhService.generateRefreshToken(newUser);

        res.status(201).json({ token, refreshToken });

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
        const { token, refreshToken } = await AuhService.loginUser( email, password );
        res.json({ token, refreshToken });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}

// Выход
export const logoutUser = async (req, res) => {
    const userId = req.body.userId;
    try {
        await AuhService.logoutUser(userId);
        res.status(200).json({ message: "Успешный выход" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при выходе" })
    }
}