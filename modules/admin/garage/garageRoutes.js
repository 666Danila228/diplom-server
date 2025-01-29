import express from "express";
import checkAuthMiddleware from "../../../utils/checkAuthMiddleware.js";
import GarageController from "./garageController.js";

const router = express.Router();

router.post('/garage', GarageController.createGarage);
router.put('/garage/:id', GarageController.updateGarage);

export default router;