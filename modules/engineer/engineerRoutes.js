import express from "express";
import tiresRoutes from "./Tires/tiresRoutes.js";
import batteryRoutes from "./Batterys/batterysRoutes.js";
import diskRoutes from "./Disk/disksRoutes.js";
import wheelRoutes from "./Wheel/wheelRoutes.js";
import EngineOil from "./EngineOil/engineOilRoutes.js"
import coolerRoutes from "./Coolant/coolantRoutes.js"
import avtoServiceRoutes from "./avtoService/avtoServiceRoutes.js";

import carRoutes from "./Car/carRoutes.js";
import fuelCardRoutes from "./FuelCard/fuelCardRoutes.js";
import TORoutes from "./TO/toRoutes.js";

const router = express.Router();

router.use('/', tiresRoutes);
router.use('/', batteryRoutes);
router.use('/', diskRoutes);
router.use('/', wheelRoutes);
router.use('/', EngineOil);
router.use('/', coolerRoutes);
router.use('/', carRoutes);
router.use('/', fuelCardRoutes);
router.use('/', TORoutes);
router.use('/', avtoServiceRoutes);


export default router;