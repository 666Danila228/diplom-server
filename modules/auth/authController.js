import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AuthService from './authService.js';
import { registerSchema, loginSchema } from '../../validations/auth/index.js';
import { handleValidationError } from "../../validations/errorHandler.js";
import prisma from "../../prisma/prismaClient.js";

// Проверка на то занят email или нет
const checkEmailExists = async (email) => {

    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        throw new Error('Email уже занят');
    }
};


// Регистрация
export const registerUser = async (req, res) => {
    try {
        // Выполняем синхронную валидацию с `abortEarly: false`, чтобы собрать все ошибки
        const value = await registerSchema.validateAsync(req.body, { abortEarly: false });

        // Если все проверки успешны, продолжаем регистрацию
        const { email, password, surname, name, patronymic } = value;

        // Создание нового пользователя
        const newUser = await AuthService.createUser(email, password, surname, name, patronymic);

        // Генерация jwt токена
        const token = AuthService.generateToken(newUser);
        // Генерация refresh токена
        const refreshToken = await AuthService.generateRefreshToken(newUser);

        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });
        res.status(201).json({ message: 'Успешная регистрация', token });

    } catch (error) {
        const errors = {};

        // Обработка ошибок валидации (синхронных)
        if (error.isJoi) {
            Object.assign(errors, handleValidationError(error));

            // Если есть синхронные ошибки, проверим также асинхронные ошибки (email)
            try {
                await checkEmailExists(req.body.email);
            } catch (emailError) {
                errors.email = emailError.message; // Добавляем ошибку email, если она есть
            }

            return res.status(400).json({ errors });
        }

        // Обрабатываем ошибку, если email уже занят
        if (error.message === "Email уже занят") {
            return res.status(409).json({ errors: { email: error.message } });
        }

        console.error(error);
        res.status(400).json({ message: error.message });
    }
};

// Авторизация
export const loginUser = async (req, res) => {
    // Из тела запроса берём email и password
    const { error, value } = loginSchema.validate(req.body, { abortEarly: false });

    if (error) {
        const errors = handleValidationError(error);
        return res.status(400).json({ errors });

    }
    const { email, password } = value;
    try {
        // Проверка данных и получение токена и рефрештокена
        const { token, refreshToken } = await AuthService.loginUser(email, password);
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