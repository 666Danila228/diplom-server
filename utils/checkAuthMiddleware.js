import prisma from "../prisma/prismaClient.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

export default async (req, res, next) => {
    // Получаем токен и преобразуем его
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    console.log('Полученный токен:', token); // Логирование для отладки

    // Проверка существует ли токен
    if (!token) {
        console.error('Токен отсутствует');
        return res.status(401).json({ message: "Токен отсутствует" });
    }

    try {
        // Проверка подлинности токена
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Декодированный токен:', decode); // Логирование для отладки

        // Поиск пользователя в базе данных
        const user = await prisma.user.findUnique({
            where: { id: decode.userId },
        });

        // Проверка, существует ли пользователь
        if (!user) {
            console.error('Пользователь не найден:', decode.userId);
            return res.status(401).json({ message: "Пользователь не найден" });
        }

        // Проверка версии токена
        if (user.jwt_token_version !== decode.jwt_token_version) {
            console.error('Версия токена не совпадает:', {
                tokenVersion: decode.jwt_token_version,
                userVersion: user.jwt_token_version,
            });
            return res.status(401).json({ message: "Токен недействительный" });
        }

        // Если все проверки пройдены, передаем управление следующему middleware
        next();
    } catch (error) {
        console.error('Ошибка при проверке токена:', error);

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Токен истёк" });
        }

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Неверный токен" });
        }

        // Обработка других ошибок
        return res.status(401).json({ message: "Ошибка при проверке авторизации" });
    }
};