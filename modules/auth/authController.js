import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AuthService from './authService.js';
import BaseController from "../utils/baseController.js";
import { registerSchema, loginSchema } from '../../validations/auth/index.js';
import { handleValidationError } from "../../validations/errorHandler.js";
import prisma from "../../prisma/prismaClient.js";

class authController extends BaseController {
    async registerUser(req, res) {
        const data = req.body;
        await super.createRecord(req, res,
            () => AuthService.createUacser(data), 'пользователь', registerSchema);
    }

}

export const loginUser = async (req, res) => {
  const { error, value } = loginSchema.validate(req.body, { abortEarly: false });

  if (error) {
      const errors = handleValidationError(error);
      return res.status(400).json({ errors });
  }

  const { email, password } = value;

  try {
      // Используем сервис для авторизации
      const { token, refreshToken, existingUser } = await AuthService.loginUser(email, password);

      // Устанавливаем refreshToken в куки
      res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });

      // Возвращаем успешный ответ
      res.json({ message: 'Авторизация успешна', token, existingUser: existingUser });
  } catch (error) {
      console.error('Ошибка при авторизации:', error);

      // Возвращаем более информативное сообщение об ошибке
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
          return res.status(500).json({ error: 'Ошибка базы данных' });
      }

      if (error instanceof jwt.JsonWebTokenError) {
          return res.status(500).json({ error: 'Ошибка генерации токена' });
      }

      res.status(500).json({ error: 'Произошла ошибка при авторизации' });
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

// Проверка авторизации
export const checkAuth = async (req, res) => {
    // Получаем токен из заголовков
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (!token) {
        return res.status(401).json({ message: "Токен отсутствует" });
    }

    try {
        // Проверяем авторизацию
        const user = await AuthService.checkAuth(token);

        // Возвращаем данные пользователя
        res.status(200).json({ user });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

// Выход
export const logoutUser = async (req, res) => {
    const userId = req.user.userId; // Получаем userId из запроса
    try {
        await AuthService.logoutUser(userId); // Передаем userId
        res.clearCookie('refreshToken');
        res.status(200).json({ message: "Успешный выход" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при выходе" });
    }
};

export default new authController();