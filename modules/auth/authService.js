// ==================================================
// ||                 Импорты                      ||
// ==================================================
import prisma from "../../prisma/prismaClient.js";
import bcrypt from "bcrypt";
import { use } from "bcrypt/promises.js";
import jwt from "jsonwebtoken";

class AuthService {
    // Регистрация пользователя
    async createUser(email, password, surname, name, patronymic) {
        try {

            // Поиск пользователей по email
            const existingUser = await prisma.user.findUnique({
                where: { email },
            });

            // Проверка если пользователь с данным email уже существует то регистрация не идёт дальше
            if (existingUser) {
                throw new Error("Пользователь уже существует");
            }

            // Хеширование пароля
            const hashedPassword = await bcrypt.hash(password, 10);

            // Создание нового пользователя
            const newUser = await prisma.user.create({
                data: {
                    surname,
                    name,
                    patronymic,
                    password: hashedPassword,
                    email,
                },
            });

            // Возвращение данных нового пользователя
            return newUser;
        } catch (error) {
            // Вывод ошибок
            console.error(error);
            throw new Error("Ошибка при создании пользователя");
        }
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
                throw new Error("Неверная почта или пароль");
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
            return { token, refreshToken};
        } catch (error) {
            console.error(error);
            throw new Error("Ошибка при авторизации");
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