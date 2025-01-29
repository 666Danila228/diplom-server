import express from "express";
import checkAuthMiddleware from "../../../utils/checkAuthMiddleware.js";
import batteryController from "./batterysController.js";
// Добавь проверку на роль

const router = express.Router();

router.get('/brandbatterys', batteryController.getAllBrandbatterys);
router.get('/brandbattery/:id', batteryController.getBrandbatteryById);

// Роуты для Modelbattery
router.get('/modelbatterys', batteryController.getAllModelbatterys);
router.get('/modelbattery/:id', batteryController.getModelbatteryById);

// Роуты для battery
router.get('/batterys', batteryController.getAllbatterys);
router.get('/battery/:id', batteryController.getbatteryByid);


export default router;