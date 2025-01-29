import express from "express";
import checkAuthMiddleware from "../../../utils/checkAuthMiddleware.js";
import TOController from "./toController.js";

const router = express.Router();

// Роуты для записей ТО
router.get('/to', TOController.getAllTO); // Получение всех ТО
router.get('/to/:id', TOController.getTOById); // Получение ТО по ID
router.delete('/to/:id', TOController.deleteTO); // Удаление ТО
router.delete('/to', TOController.deleteManyTO); // Удаление нескольких ТО

// Роуты для получения данных, связанных с ТО
router.get('/toCar/:carId', TOController.getTOHistoryByCarId); // Получение ТО для машины// Роуты для добавления расходных материалов к ТО
router.get('/to/:id/consumables', TOController.getConsumablesByTOId); // Получение расходных материалов для ТО

export default router;