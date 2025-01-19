import express from "express";
import checkAuthMiddleware from "../../../utils/checkAuthMiddleware.js";
import EngineOilController from "./engineOilController.js";
// Добавь проверку на роль

const router = express.Router();

router.post('/brandEngineOil', EngineOilController.createBrandEngineOil);
router.get('/brandEngineOils', EngineOilController.getAllBrandEngineOils);
router.get('/brandEngineOil/:id', EngineOilController.getBrandEngineOilById);
router.put('/brandEngineOil/:id', EngineOilController.updateBrandEngineOil);
router.delete('/brandEngineOil/:id', EngineOilController.deleteBrandEngineOil);
router.delete('/brandEngineOils/delete-many', EngineOilController.deleteManyBrandEngineOils);

// Роуты для ModelEngineOil
router.post('/modelEngineOil', EngineOilController.createModelEngineOil);
router.get('/modelEngineOils', EngineOilController.getAllModelEngineOils);
router.get('/modelEngineOil/:id', EngineOilController.getModelEngineOilById);
router.put('/modelEngineOil/:id', EngineOilController.updateModelEngineOil);
router.delete('/modelEngineOil/:id', EngineOilController.deleteModelEngineOil);
router.delete('/modelEngineOils/delete-many', EngineOilController.deleteManyModelEngineOils);

// Роуты для EngineOil
router.post('/EngineOil', EngineOilController.createEngineOil);
router.get('/EngineOils', EngineOilController.getAllEngineOils);
router.get('/EngineOil/:id', EngineOilController.getEngineOilByid);
router.put('/EngineOil/:id', EngineOilController.updateEngineOil);
router.delete('/EngineOil/:id', EngineOilController.deleteEngineOil);
router.delete('/EngineOils/delete-many', EngineOilController.deleteManyEngineOils);
router.post('/EngineOilWriteOff', EngineOilController.EngineOilWriteOff);


export default router;