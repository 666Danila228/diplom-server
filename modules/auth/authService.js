// ==================================================
// ||                 Импорты                      ||
// ==================================================
import prisma from "../../prisma/prismaClient.js";
import bcrypt from "bcrypt";
import { use } from "bcrypt/promises.js";
import jwt from "jsonwebtoken";
import BaseService from "../engineer/utils/baseService.js";

class AuthService extends BaseService {
    // Регистрация пользователя
    async createUser(data) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        return this.createRecord('user', {
            ...data,
            password: hashedPassword,
        }, 'пользователь'); // Указываем, что проверка должна быть по email
    }

    //Авторизация   
    async loginUser(email, password) {
        try {

            // Поиск пользователей по email и проверка на "мягкое" удаление
            const existingUser = await prisma.user.findUnique({
                where: {
                    email: email,
                    is_deleted: false,
                },
            });

            // Проверка существует данный пользователь или нет
            if (!existingUser) {
                throw new Error("Данного пользователя не существует");
            }

            // Првоеряем полученный пароль с хэшированным паролем в бд
            const isValidPass = await bcrypt.compare(password, existingUser.password);
            if (!isValidPass) {
                throw new Error("Невераня почта или пароль");
            }

            // Создание токена
            const token = this.generateToken(existingUser);

            // Обновление рефрештокена в бд
            const refreshToken = await this.generateRefreshToken(existingUser);

            // Возвращение токена и рефрештокена
            return { token, refreshToken, existingUser };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    
     // Проверка авторизации
    async checkAuth(token) {
        try {
            // Проверка подлинности токена
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Поиск пользователя в базе данных
            const user = await prisma.user.findUnique({
                where: { id: decoded.userId },
            });

            // Проверка, существует ли пользователь и совпадает ли версия токена
            if (!user || user.jwt_token_version !== decoded.jwt_token_version) {
                throw new Error("Токен недействителен");
            }

            // Возвращение данных пользователя
            return user;
        } catch (error) {
            console.error(error);
            throw new Error("Ошибка при проверке авторизации");
        }
    }

    // Выход
    // Удаляем у пользователя рефреш токен и время его жизни и дабавляем икремент к версии токена
    async logoutUser(userId) {
        try {
            await prisma.user.update({
                where: { id: userId },
                data: {
                    jwt_token_version: { increment: 1 },
                    refresh_token: null,
                    refresh_token_expires_at: null,
                }
            });
        } catch (error) {
            console.log(error);
            throw new Error("Ошибка при выходе");
        }
    }

    // ==================================================
    // ||                   Токен                      ||
    // ==================================================

    // Напиши кто что делает
    // Функция для генерация токена которая получает объёкт user в качестве аргумента
    generateToken(user) {
        // Данные хранящиеся в токене
        const payload = {
            userId: user.id,
            email: user.email,
            roleId: user.role_id,
            jwt_token_version: user.jwt_token_version,
        };

        // Время жизни токена
        const options = {
            expiresIn: '1h',
        };

        // Возвращение созданного токена
        return jwt.sign(payload, process.env.JWT_SECRET, options)
    }

    // Напиши кто что делает
    // Функциия для генерации рефрештокена
    async generateRefreshToken(user) {
        const refreshToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);

        // Добавление нового рефрештокена
        await prisma.user.update({
            where: { id: user.id },
            data: {
                refresh_token: refreshToken,
                refresh_token_expires_at: expiresAt,
            },
        });

        return refreshToken;
    }

    // Напиши кто что делает
    // Функция для обновления токена
    async refreshToken(refreshToken) {
        try {
            const decode = jwt.verify(refreshToken, process.env.JWT_SECRET);
            const user = await prisma.user.findUnique({
                where: { id: decode.userId },
            });

            if (!user || user.refresh_token !== refreshToken) {
                throw new Error("Недействительный рефреш токен");
            }

            const newToken = this.generateToken(user);
            return newToken;
        } catch (error) {
            console.error(error);
            throw new Error("Ошибка при обновлении токена");
        }
    }

    // Напиши кто что делает
    // Функция для отзывания рефрештокена
    async revokeTokens(userId) {
        await prisma.user.update({
            where: { id: userId },
            data: {
                jwt_token_version: { increment: 1 },
                refresh_token: null,
                refresh_token_expires_at: null,
            },
        });
    }
}

export default new AuthService();