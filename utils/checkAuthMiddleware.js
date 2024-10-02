// Middleware для проверки что пользователь авторезирован

// ==================================================
// ||                 Импорты                      ||
// ==================================================
import prisma from "../prisma/prismaClient.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config()

export default async (req, res, next) => {
    // Получаем токен и преобразуем его
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    // Проверка существует ли токен
    if(!token) {
        return res.status(401).json({ message: "Токен отсутсвует" });
    }

    try {
        // Проверка подлинности
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;

        // Поиск пользователя
        const user = await prisma.user.findUnique({
            where: { id: decode.userId },
        });

        if(!user || user.jwt_token_version !== decode.jwt_token_version) {
            return res.status(401).json({ message: "Токен не действительный" });
        }

        next()
    } catch (error) {
        if(error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Токен истёк" });
        }
        return res.status(401).json({ message: "Неверный токен" });
    }
};