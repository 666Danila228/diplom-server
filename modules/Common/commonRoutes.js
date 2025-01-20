import express from "express";
// import tiresRoutes from "./Tires/tiresRoutes.js";
import engineOilRoutes from "./EngineOil/engineOilRoutes.js";
import coolantRoutes from "./Coolant/coolantRoutes.js";

const router = express.Router();

// router.use('/', tiresRoutes);
router.use('/', engineOilRoutes)
router.use('/', coolantRoutes)


export default router;