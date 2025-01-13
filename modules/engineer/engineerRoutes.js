import express from "express";
import tiresRoutes from "./Tires/tiresRoutes.js";
import batteryRoutes from "./Batterys/batterysRoutes.js";
import diskRoutes from "./Disk/disksRoutes.js";
import wheelRoutes from "./Wheel/wheelRoutes.js";
import coolerRoutes from "./Coolant/coolantRoutes.js"
import avtoServiceRoutes from "./avtoService/avtoServiceRoutes.js";
import carRoutes from "./Car/carRoutes.js";
import fuelCardRoutes from "./FuelCard/fuelCardRoutes.js";

const router = express.Router();

router.use('/', tiresRoutes);
router.use('/', batteryRoutes);
router.use('/', diskRoutes);
router.use('/', wheelRoutes);
router.use('/', coolerRoutes);
router.use('/', avtoServiceRoutes);
router.use('/', carRoutes);
router.use('/', fuelCardRoutes)


export default router;