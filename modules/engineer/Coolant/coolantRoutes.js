import express from "express";
import checkAuthMiddleware from "../../../utils/checkAuthMiddleware.js";
import CoolantController from "./coolantController.js";
// Добавь проверку на роль

const router = express.Router();

router.post('/brandCoolant', CoolantController.createBrandCoolant);
router.get('/brandCoolants', CoolantController.getAllBrandCoolants);
router.get('/brandCoolant/:id', CoolantController.getBrandCoolantById);
router.put('/brandCoolant/:id', CoolantController.updateBrandCoolant);
router.delete('/brandCoolant/:id', CoolantController.deleteBrandCoolant);
router.delete('/brandCoolants/delete-many', CoolantController.deleteManyBrandCoolants);

// Роуты для ModelCoolant
router.post('/modelCoolant', CoolantController.createModelCoolant);
router.get('/modelCoolants', CoolantController.getAllModelCoolants);
router.get('/modelCoolant/:id', CoolantController.getModelCoolantById);
router.put('/modelCoolant/:id', CoolantController.updateModelCoolant);
router.delete('/modelCoolant/:id', CoolantController.deleteModelCoolant);
router.delete('/modelCoolants/delete-many', CoolantController.deleteManyModelCoolants);

// Роуты для Coolant
router.post('/Coolant', CoolantController.createCoolant);
router.get('/Coolants', CoolantController.getAllCoolants);
router.get('/Coolant/:id', CoolantController.getCoolantByid);
router.put('/Coolant/:id', CoolantController.updateCoolant);
router.delete('/Coolant/:id', CoolantController.deleteCoolant);
router.delete('/Coolants/delete-many', CoolantController.deleteManyCoolants);
router.post('/CoolantWriteOff', CoolantController.CoolantWriteOff);


export default router;