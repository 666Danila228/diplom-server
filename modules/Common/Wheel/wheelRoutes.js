import express from "express";
import checkAuthMiddleware from "../../../utils/checkAuthMiddleware.js";
import WheelController from "./wheelController.js";

const router = express.Router()

router.get('/wheels', WheelController.getAllWheels);
router.get('/wheel/:id', WheelController.getWheelById);

export default router;