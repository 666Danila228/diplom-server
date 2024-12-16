import express from "express";
import tiresRoutes from "./Tires/tiresRoutes.js";
import batteryRoutes from "./Batterys/batterysRoutes.js";

const router = express.Router();

router.use('/', tiresRoutes);
router.use('/', batteryRoutes);

export default router;