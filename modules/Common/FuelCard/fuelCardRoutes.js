import express from "express";
import checkAuthMiddleware from "../../../utils/checkAuthMiddleware.js";
import FuelCardController from "./fuelCardController.js";

const router = express.Router();

// Роуты для стандартных норм расхода топлива
router.get("/fuelConsumptionRates",  FuelCardController.getAllFuelConsumptionRates);
router.get("/fuelConsumptionRate/:id",  FuelCardController.getFuelConsumptionRateById);

// Роуты для топливных карт
router.get("/fuelCards",  FuelCardController.getAllFuelCards);
router.get("/fuelCard/:id",  FuelCardController.getFuelCardById);
router.get("/fuelCard/car/:carId",  FuelCardController.getFuelCardByCarId);

export default router;