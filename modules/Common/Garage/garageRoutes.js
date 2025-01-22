import express from "express";
import GarageController from "./GarageController.js";

const router = express.Router();

router.get('/garages', GarageController.getAllGarages);
router.get('/garage/:id', GarageController.getGarageById);

export default router;