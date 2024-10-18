import userService from './userService.js';

class UserController {
    async updateUser(req, res) {
        const userId = req.user.userId;
        const updatedData = req.body;

        try {
            const updatedUser = await userService.updateUser(userId, updatedData);
            res.status(200).json({message: "Данные изменены" ,updatedUser}); 
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default new UserController();