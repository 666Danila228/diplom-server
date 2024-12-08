import prisma from "../../prisma/prismaClient.js";
import bcrypt from "bcrypt";

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


    // Обновление данных пользователя
    async updateUser(userId, updatedData) {
        try {
            // Поиск пользователя по id
            const user = await prisma.user.findUnique({
                where: {
                    id: userId
                },
            });

            if (!user) {
                throw new Error("Пользователь не найден")
            }

            const dataToUpdate = {};

            Object.keys(updatedData).forEach(key => {
                if (key === 'password'){
                    const hashedPassword = bcrypt.hashSync(updatedData[key], 10);
                    dataToUpdate[key] = hashedPassword;
                    dataToUpdate.updated_password_at = new Date(Date.now() + 3 * 60 * 60 * 1000);
                } else if (updatedData[key] !== user[key]) {
                    dataToUpdate[key] = updatedData[key];
                }
            });

            if (Object.keys(dataToUpdate).length === 0) {
                throw new Error("Нет изменений в данных");
            }

            await prisma.user.update({
                where: { id: userId },
                data: dataToUpdate,
            });

        } catch (error) {
            console.error(error);
            throw new Error("Не удалось обновить данные пользователя");
        }
    }
}

export default new UserService();