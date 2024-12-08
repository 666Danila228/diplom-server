import userService from './userService.js';
import { updateUserSchema } from './../../validations/users/index.js';
import { handleValidationError } from "../../validations/errorHandler.js";

class UserController {

    async updateUser(req, res) {
        const userId = req.user.userId;
        
        try {
            // Выполняем валидацию данных
            const value = await updateUserSchema.validateAsync(req.body, { abortEarly: false });

            // После успешной валидации обновляем пользователя
            const updatedUser = await userService.updateUser(userId, value);
            return res.status(200).json({ message: "Данные изменены", updatedUser });

        } catch (error) {
            const errors = {};

            // Обработка ошибок валидации (синхронных)
            if (error.isJoi) {
                Object.assign(errors, handleValidationError(error));
                return res.status(400).json({ errors });
            }

             // Обрабатываем ошибку, если нет изменений в данных
             if (error.message === "Нет изменений в данных") {
                return res.status(400).json({ message: error.message });
            }

            // Обрабатываем ошибку, если email уже занят
            if (error.message === "Email уже занят") {
                return res.status(409).json({ errors: { email: error.message } });
            }

            console.error(error);
            return res.status(400).json({ message: error.message });
        }
    }
}

export default new UserController();