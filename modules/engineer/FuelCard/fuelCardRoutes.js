import express from "express";
import checkAuthMiddleware from "../../../utils/checkAuthMiddleware.js";
import FuelCardController from "./fuelCardController.js";

const router = express.Router();

// Роуты для стандартных норм расхода топлива
router.post("/fuelConsumptionRate",  FuelCardController.createFuelConsumptionRate);
router.get("/fuelConsumptionRates",  FuelCardController.getAllFuelConsumptionRates);
router.get("/fuelConsumptionRate/:id",  FuelCardController.getFuelConsumptionRateById);
router.put("/fuelConsumptionRate/:id",  FuelCardController.updateFuelConsumptionRate);

// Роуты для топливных карт
router.post("/fuelCard",  FuelCardController.createFuelCard);
router.get("/fuelCards",  FuelCardController.getAllFuelCards);
router.get("/fuelCard/:id",  FuelCardController.getFuelCardById);
router.get("/fuelCard/car/:carId",  FuelCardController.getFuelCardByCarId);
router.put("/fuelCard/:id",  FuelCardController.updateFuelCard);

// Роуты для привязки/отвязки водителяф
router.post("/fuelCard/assign",  FuelCardController.assignUserToFuelCard);
router.post("/fuelCard/unassign",  FuelCardController.unassignUserFromFuelCard);

// Роуты для истории привязок
router.get("/fuelCard/:fuelCardId/history",  FuelCardController.getFuelCardAssignmentHistory);

// Роуты для истории расходов топлива
router.post("/fuelCardHistory",  FuelCardController.createFuelCardHistory);

export default router;