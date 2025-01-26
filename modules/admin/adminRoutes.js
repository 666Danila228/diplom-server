import express from "express";
// import tiresRoutes from "./Tires/tiresRoutes.js";
import avtoServiceRoutes from "./avtoService/avtoServiceRoutes.js";

const router = express.Router();

// router.use('/', tiresRoutes);
router.use('/', avtoServiceRoutes);

export default router;