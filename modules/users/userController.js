// ==================================================
// ||                 Импорты                      ||
// ==================================================
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserService from './userService.js'

// Регистрация
export const registerUser = async (req, res) => {

    // Получение с тела запрооса данных
    const { email, password, surname, name, patronymic } = req.body;

    try {

        // Создание нового пользователя
        const newUser = await UserService.createUser(email, password, surname, name, patronymic);

        // Генерация jwt токена
        const token = UserService.generateToken(newUser);

        // Генерация refresh токена
        const refreshToken = await UserService.generateRefreshToken(newUser);

        res.status(201).json({ token, refreshToken });

    } catch (error) {
        if(error.message === "Пользователь уже существует") {
            res.status(409).json({ message: error.message });
        } else {
            console.error(error);
            res.status(400).json({ message: error.message });
        }
    }
}

export const loginUser = async (req, res) => {

    const { email, password } = req.body;
    try {
        const { token, refreshToken } = await UserService.loginUser( email, password );
        res.json({ token, refreshToken });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}