import BaseService from "../utils/baseService.js";
import prisma from "../../prisma/prismaClient.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthService extends BaseService {
    // Регистрация пользователя
    async createUser(data) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        return super.createRecord('user', {
            ...data,
            password: hashedPassword,
            avatar: data.avatar || 'uploads/users/default-avatar.png',
        }, 'пользователь');
    }

    // Авторизация пользователя
    async loginUser(email, password) {
        try {
            // Поиск пользователя по email
            const existingUser = await prisma.user.findUnique({
                where: {
                    email: email,
                    is_deleted: false,
                },
            });

            if (!existingUser) {
                throw new Error("Данного пользователя не существует");
            }

            // Проверка пароля
            const isValidPass = await bcrypt.compare(password, existingUser.password);
            if (!isValidPass) {
                throw new Error("Неверная почта или пароль");
            }

            // Генерация токенов
            const token = this.generateToken(existingUser);
            const refreshToken = await this.generateRefreshToken(existingUser);

            return { token, refreshToken, existingUser };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    // Проверка авторизации
    async checkAuth(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await super.getRecordById('user', decoded.userId, 'пользователь');

            if (!user || user.jwt_token_version !== decoded.jwt_token_version) {
                throw new Error("Токен недействителен");
            }

            return user;
        } catch (error) {
            console.error(error);
            throw new Error("Ошибка при проверке авторизации");
        }
    }

    // Выход пользователя
    async logoutUser(userId) {
        try {
            await super.updateRecord('user', userId, {
                jwt_token_version: { increment: 1 },
                refresh_token: null,
                refresh_token_expires_at: null,
            }, 'пользователь');
        } catch (error) {
            console.error(error);
            throw new Error("Ошибка при выходе");
        }
    }

    // Генерация токена
    generateToken(user) {
        const payload = {
            userId: user.id,
            email: user.email,
            roleId: user.role_id,
            jwt_token_version: user.jwt_token_version,
        };

        const options = {
            expiresIn: '1h',
        };

        return jwt.sign(payload, process.env.JWT_SECRET, options);
    }

    // Генерация refresh-токена
    async generateRefreshToken(user) {
        const refreshToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);

        await super.updateRecord('user', user.id, {
            refresh_token: refreshToken,
            refresh_token_expires_at: expiresAt,
        }, 'пользователь');

        return refreshToken;
    }

    // Обновление токена
    async refreshToken(refreshToken) {
        try {
            const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
            const user = await super.getRecordById('user', decoded.userId, 'пользователь');

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

    // Отзыв токенов
    async revokeTokens(userId) {
        await super.updateRecord('user', userId, {
            jwt_token_version: { increment: 1 },
            refresh_token: null,
            refresh_token_expires_at: null,
        }, 'пользователь');
    }
}

export default new AuthService();