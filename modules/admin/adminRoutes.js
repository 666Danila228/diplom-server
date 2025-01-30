import express from "express";
// import tiresRoutes from "./Tires/tiresRoutes.js";

import garageRoutes from "./garage/garageRoutes.js";

const router = express.Router();

// router.use('/', tiresRoutes);


router.use('/', garageRoutes);


export default router;