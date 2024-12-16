import express from "express";
import checkAuthMiddleware from "../../../utils/checkAuthMiddleware.js";
import TireController from "./tiresController.js";
// Добавь проверку на роль

const router = express.Router();

router.post('/brandTire', checkAuthMiddleware, TireController.createBrandTire);
router.get('/brandTires', checkAuthMiddleware, TireController.getAllBrandTires);
router.get('/brandTire/:id', checkAuthMiddleware, TireController.getBrandTireById);
router.put('/brandTire/:id', checkAuthMiddleware, TireController.updateBrandTire);

router.post('/modelTire', checkAuthMiddleware, TireController.createModelTire);
router.get('/modelTires', checkAuthMiddleware, TireController.getAllModelTires);
router.get('/modelTire/:id', checkAuthMiddleware, TireController.getModelTireById);
router.put('/modelTire/:id', checkAuthMiddleware, TireController.updateModelTire);

router.post('/tire', checkAuthMiddleware, TireController.createTire);
router.get('/tires', checkAuthMiddleware, TireController.getAllTires);
router.get('/tire/:id', checkAuthMiddleware, TireController.getTireByid);
router.put('/tire/:id', checkAuthMiddleware, TireController.updateTire);

export default router;