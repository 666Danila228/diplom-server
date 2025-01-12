import express from "express";
import checkAuthMiddleware from "../../../utils/checkAuthMiddleware.js";
import CarController from "./carController.js";

const router = express.Router();

router.post('/brandCar', CarController.createBrandCar);
router.get('/brandCar', CarController.getAllBrandCars);
router.get('/brandCar/:id', CarController.getBrandCarById);
router.put('/brandCar/:id', CarController.updateBrandCar);


router.post('/modelCar', CarController.createModelCar);
router.get('/modelCar', CarController.getAllModelCars);
router.get('/modelCar/:id', CarController.getModelCarById);
router.put('/modelCar/:id', CarController.updateModelCar);


router.post('/typeCar', CarController.createTypeCar);
router.get('/typeCar', CarController.getAllTypeCar);
router.get('/typeCar/:id', CarController.getTypeCarById);
router.put('/typeCar/:id', CarController.updateTypeCar);


router.post('/car', CarController.createCar);
router.get('/car', CarController.getAllCars);
router.get('/car/:id', CarController.getCarById);
router.put('/car/:id', CarController.updateCar);


export default router;
