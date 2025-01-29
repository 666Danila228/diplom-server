import express from "express";
import checkAuthMiddleware from "../../../utils/checkAuthMiddleware.js";
import CarController from "./carController.js";

const router = express.Router();

router.post('/brandCar', CarController.createBrandCar);
router.put('/brandCar/:id', CarController.updateBrandCar);


router.post('/modelCar', CarController.createModelCar);
router.put('/modelCar/:id', CarController.updateModelCar);


router.post('/typeCar', CarController.createTypeCar);
router.put('/typeCar/:id', CarController.updateTypeCar);


router.post('/car', CarController.createCar);
router.put('/car/:id', CarController.updateCar);


export default router;
