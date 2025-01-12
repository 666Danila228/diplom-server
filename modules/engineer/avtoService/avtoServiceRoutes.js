import express from "express";
import checkAuthMiddleware from "../../../utils/checkAuthMiddleware.js";
import AvtoServiceController from "./avtoServiceController.js";

const router = express.Router();

router.post('/avtoService', AvtoServiceController.createAvtoService);
router.get('/avtoService', AvtoServiceController.getAllAvtoService);
router.get('/avtoService/:id', AvtoServiceController.getAvtoServiceById);
router.put('/avtoService/:id', AvtoServiceController.updateAvtoService);

export default router;
