import express from "express";
import checkAuthMiddleware from "../../../utils/checkAuthMiddleware.js";
import EngineOilController from "./engineOilController.js";
// Добавь проверку на роль

const router = express.Router();


router.get('/brandEngineOils', EngineOilController.getAllBrandEngineOils);
router.get('/brandEngineOil/:id', EngineOilController.getBrandEngineOilById);

// Роуты для ModelEngineOil
router.get('/modelEngineOils', EngineOilController.getAllModelEngineOils);
router.get('/modelEngineOil/:id', EngineOilController.getModelEngineOilById);


// Роуты для EngineOil
router.get('/EngineOils', EngineOilController.getAllEngineOils);
router.get('/EngineOil/:id', EngineOilController.getEngineOilByid);


export default router;