// ==================================================
// ||                 Импорты                      ||
// ==================================================
import prisma from "../../prisma/prismaClient.js";
import bcrypt, { compare } from "bcrypt";
import jwt from "jsonwebtoken";

class UserService {
    // Получение данных о пользователе по id
    async getUserById(userId) {
        try {
            // Поиск пользователя по id
            const user = await prisma.user.findUnique({
                where: { id: userId },
                include: {
                    role: true,
                },
            });

            // Проверка существует пользователь с данным id
            if (!user) {
                throw new Error("Пользователь не найден");
            }

            return user

        } catch (error) {
            console.error(error);
            throw new Error("Не удалось найти пользователя");
        }
    }

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

// ==================================================
// ||                   Токен                      ||
// ==================================================

    // Функция для генерация токена которая получает объёкт user в качестве аргумента
    generateToken(user) {
        // 
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

    async generateRefreshToken(user) {
        const refreshToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        }); 

        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);

        await prisma.user.update({
            where: { id: user.id },
            data: {
                refresh_token: refreshToken,
                refresh_token_expires_at: expiresAt,
            },
        });

        return refreshToken;
    }

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


    async loginUser(email, password) {
        try {
            
            // Поиск пользователей по email и проверка на "мягкое" удаление
            const existingUser = await prisma.user.findUnique({
                where: { 
                    email: email,
                    isDeleted: false,
                },
            });

            // Проверка существует данный пользователь или нет
            if(!existingUser) {
                throw new Error("Неверная почта или пароль");
            }
            
            // Првоеряем полученный пароль с хэшированным паролем в бд
            const isValidPass = await bcrypt.compare(password, existingUser.password);
            if(!isValidPass) {
                throw new Error("Невераня почта или пароль"); 
            }

            const token = this.generateToken(existingUser);

            const refreshToken = await this.generateRefreshToken(existingUser);

            return { token, refreshToken};
        } catch (error) {
            console.error(error);
            throw new Error("Ошибка при авторизации");
        }
    }
}

export default new UserService();