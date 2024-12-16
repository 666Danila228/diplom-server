import express from "express";

import BatteryController from "./batterysController.js";

const router = express.Router();

router.post('/brandBattery', BatteryController.createBrandBattery);

export default router;