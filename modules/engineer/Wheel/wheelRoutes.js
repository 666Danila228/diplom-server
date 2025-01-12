import express from "express";
import checkAuthMiddleware from "../../../utils/checkAuthMiddleware.js";
import WheelController from "./wheelController.js";

const router = express.Router()

router.post('/wheel', WheelController.createWheel);

export default router;