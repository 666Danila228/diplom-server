import express from "express";
import EngineerController from "./engineerController.js";
import checkAuthMiddleware from "../../utils/checkAuthMiddleware.js";
// Добавь проверку на роль

const router = express.Router();

router.post('/createBrandTire', checkAuthMiddleware, EngineerController.createBrandTire );
router.get('/brandTires', checkAuthMiddleware, EngineerController.getAllBrandTires);

router.post('/createModelTire', checkAuthMiddleware, EngineerController.createModelTire);
router.get('/modelTires', checkAuthMiddleware, EngineerController.getAllModelTires);

router.post('/createTire', checkAuthMiddleware, EngineerController.createTire);
router.get('/tires', checkAuthMiddleware, EngineerController.getAllTires);

export default router;