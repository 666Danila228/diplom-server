import express from "express";
import checkAuthMiddleware from "../../../utils/checkAuthMiddleware.js";
import DiskController from "./disksController.js";
// Добавь проверку на роль

const router = express.Router();

router.get('/brandDisks', DiskController.getAllBrandDisks);
router.get('/brandDisk/:id', DiskController.getBrandDiskById);

// Роуты для ModelDisk
router.get('/modelDisks', DiskController.getAllModelDisks);
router.get('/modelDisk/:id', DiskController.getModelDiskById);

// Роуты для Disk
router.get('/Disks', DiskController.getAllDisks);
router.get('/Disk/:id', DiskController.getDiskByid);

export default router;