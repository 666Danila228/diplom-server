import express from "express";
import checkAuthMiddleware from "../../../utils/checkAuthMiddleware.js";
import batteryController from "./batterysController.js";
// Добавь проверку на роль

const router = express.Router();

router.post('/brandbattery', batteryController.createBrandbattery);
router.get('/brandbatterys', batteryController.getAllBrandbatterys);
router.get('/brandbattery/:id', batteryController.getBrandbatteryById);
router.put('/brandbattery/:id', batteryController.updateBrandbattery);
router.delete('/brandbattery/:id', batteryController.deleteBrandbattery);
router.delete('/brandbatterys/delete-many', batteryController.deleteManyBrandbatterys);

// Роуты для Modelbattery
router.post('/modelbattery', batteryController.createModelbattery);
router.get('/modelbatterys', batteryController.getAllModelbatterys);
router.get('/modelbattery/:id', batteryController.getModelbatteryById);
router.put('/modelbattery/:id', batteryController.updateModelbattery);
router.delete('/modelbattery/:id', batteryController.deleteModelbattery);
router.delete('/modelbatterys/delete-many', batteryController.deleteManyModelbatterys);

// Роуты для battery
router.post('/battery', batteryController.createbattery);
router.get('/batterys', batteryController.getAllbatterys);
router.get('/battery/:id', batteryController.getbatteryByid);
router.put('/battery/:id', batteryController.updatebattery);
router.delete('/battery/:id', batteryController.deletebattery);
router.delete('/batterys/delete-many', batteryController.deleteManybatterys);
router.post('/batteryWriteOff', batteryController.batteryWriteOff);


export default router;