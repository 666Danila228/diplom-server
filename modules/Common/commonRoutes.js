import express from "express";
// import tiresRoutes from "./Tires/tiresRoutes.js";
import engineOilRoutes from "./EngineOil/engineOilRoutes.js";
import coolantRoutes from "./Coolant/coolantRoutes.js";
import garageRoutes from "./Garage/garageRoutes.js";
import tiresRoutes from "./Tires/tiresRoutes.js";

const router = express.Router();

// router.use('/', tiresRoutes);
router.use('/', engineOilRoutes);
router.use('/', coolantRoutes);
router.use('/', garageRoutes);
router.use('/', tiresRoutes);

export default router;