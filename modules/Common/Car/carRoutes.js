import express from "express";
import checkAuthMiddleware from "../../../utils/checkAuthMiddleware.js";
import CarController from "./carController.js";

const router = express.Router();

router.get('/brandsCar', CarController.getAllBrandCars);
router.get('/brandCar/:id', CarController.getBrandCarById);


router.get('/modelsCar', CarController.getAllModelCars);
router.get('/modelCar/:id', CarController.getModelCarById);


router.get('/typesCar', CarController.getAllTypeCar);
router.get('/typeCar/:id', CarController.getTypeCarById);


router.get('/cars', CarController.getAllCars);
router.get('/с/:id', CarController.getCarById);


export default router;
