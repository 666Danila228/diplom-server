import prisma from "../../prisma/prismaClient";

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
}