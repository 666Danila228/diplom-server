import express from "express";
import checkAuthMiddleware from "../../../utils/checkAuthMiddleware.js";
import TireController from "./tiresController.js";
// Добавь проверку на роль

const router = express.Router();

router.get('/brandTires', TireController.getAllBrandTires);
router.get('/brandTire/:id', TireController.getBrandTireById);

// Роуты для ModelTire
router.get('/modelTires', TireController.getAllModelTires);
router.get('/modelTire/:id', TireController.getModelTireById);

// Роуты для Tire
router.get('/tires', TireController.getAllTires);
router.get('/tire/:id', TireController.getTireById);


export default router;