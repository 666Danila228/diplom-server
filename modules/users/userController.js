// ==================================================
// ||                 Импорты                      ||
// ==================================================
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserService from './userService.js'

// Регистрация
export const registerUser = async (req, res) => {

    try {
        // Получение с тела запрооса данных
        const {email, password, surname, name, patronymic} = req.body;

        // Создание нового пользователя
        const newUser = await UserService.createUser(email, password, surname, name, patronymic);

        // Генерация jwt токена
        const token = UserService.generateToken(newUser);

        // Генерация refresh токена
        const refreshToken = await UserService.generateRefreshToken(newUser);

        res.status(201).json({token, refreshToken});

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}