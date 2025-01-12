import express from "express";
import checkAuthMiddleware from "../../../utils/checkAuthMiddleware.js";
import DiskController from "./disksController.js";
// Добавь проверку на роль

const router = express.Router();

router.post('/brandDisk', DiskController.createBrandDisk);
router.get('/brandDisks', DiskController.getAllBrandDisks);
router.get('/brandDisk/:id', DiskController.getBrandDiskById);
router.put('/brandDisk/:id', DiskController.updateBrandDisk);
router.delete('/brandDisk/:id', DiskController.deleteBrandDisk);
router.delete('/brandDisks/delete-many', DiskController.deleteManyBrandDisks);

// Роуты для ModelDisk
router.post('/modelDisk', DiskController.createModelDisk);
router.get('/modelDisks', DiskController.getAllModelDisks);
router.get('/modelDisk/:id', DiskController.getModelDiskById);
router.put('/modelDisk/:id', DiskController.updateModelDisk);
router.delete('/modelDisk/:id', DiskController.deleteModelDisk);
router.delete('/modelDisks/delete-many', DiskController.deleteManyModelDisks);

// Роуты для Disk
router.post('/Disk', DiskController.createDisk);
router.get('/Disks', DiskController.getAllDisks);
router.get('/Disk/:id', DiskController.getDiskByid);
router.put('/Disk/:id', DiskController.updateDisk);
router.delete('/Disk/:id', DiskController.deleteDisk);
router.delete('/Disks/delete-many', DiskController.deleteManyDisks);
router.post('/DiskWriteOff', DiskController.DiskWriteOff);


export default router;