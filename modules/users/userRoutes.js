import express from "express";
import userController from './userController.js';
import checkAuthMiddleware from "../../utils/checkAuthMiddleware.js";

const router = express.Router();

router.post('/updateUserData', checkAuthMiddleware, userController.updateUser);

export default router;