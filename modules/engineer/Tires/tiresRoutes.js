import express from "express";
import checkAuthMiddleware from "../../../utils/checkAuthMiddleware.js";
import TireController from "./tiresController.js";
// Добавь проверку на роль

const router = express.Router();

router.post('/brandTire', TireController.createBrandTire);
router.get('/brandTires', TireController.getAllBrandTires);
router.get('/brandTire/:id', TireController.getBrandTireById);
router.put('/brandTire/:id', TireController.updateBrandTire);
router.delete('/brandTire/:id', TireController.deleteBrandTire);
router.delete('/brandTires/delete-many', TireController.deleteManyBrandTires);

// Роуты для ModelTire
router.post('/modelTire', TireController.createModelTire);
router.get('/modelTires', TireController.getAllModelTires);
router.get('/modelTire/:id', TireController.getModelTireById);
router.put('/modelTire/:id', TireController.updateModelTire);
router.delete('/modelTire/:id', TireController.deleteModelTire);
router.delete('/modelTires/delete-many', TireController.deleteManyModelTires);

// Роуты для Tire
router.post('/tire', TireController.createTire);
router.get('/tires', TireController.getAllTires);
router.get('/tire/:id', TireController.getTireByid);
router.put('/tire/:id', TireController.updateTire);
router.delete('/tire/:id', TireController.deleteTire);
router.delete('/tires/delete-many', TireController.deleteManyTires);


export default router;