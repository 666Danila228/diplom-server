import express from "express";
import checkAuthMiddleware from "../../../utils/checkAuthMiddleware.js";
import CoolantController from "./coolantController.js";
// Добавь проверку на роль

const router = express.Router();

router.get('/brandCoolants', CoolantController.getAllBrandCoolants);
router.get('/brandCoolant/:id', CoolantController.getBrandCoolantById);

// Роуты для ModelCoolant
router.get('/modelCoolants', CoolantController.getAllModelCoolants);
router.get('/modelCoolant/:id', CoolantController.getModelCoolantById);
// Роуты для Coolant
router.get('/Coolants', CoolantController.getAllCoolants);
router.get('/Coolant/:id', CoolantController.getCoolantByid);

export default router;