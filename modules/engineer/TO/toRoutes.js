import express from "express";
import checkAuthMiddleware from "../../../utils/checkAuthMiddleware.js";
import TOController from "./toController.js";

const router = express.Router();

// Роуты для записей ТО
router.post('/to', TOController.createTO); // Создание ТО
router.get('/to', TOController.getAllTO); // Получение всех ТО
router.get('/to/:id', TOController.getTOById); // Получение ТО по ID
router.put('/to/:id', TOController.updateTO); // Обновление ТО
router.delete('/to/:id', TOController.deleteTO); // Удаление ТО
router.delete('/to', TOController.deleteManyTO); // Удаление нескольких ТО

// Роуты для завершения, отмены и принятия ТО
router.post('/to/:id/complete', TOController.completeTO); // Завершение ТО
router.post('/to/:id/cancel', TOController.cancelTO); // Отмена ТО
router.post('/to/:id/accept', TOController.acceptTO); // Принятие заявки на ТО

// Роуты для получения данных, связанных с ТО
router.get('/toCar/:carId', TOController.getTOHistoryByCarId); // Получение ТО для машины// Роуты для добавления расходных материалов к ТО
router.post('/to/:toId/consumables', TOController.addConsumables);
router.get('/to/:id/consumables', TOController.getConsumablesByTOId); // Получение расходных материалов для ТО

export default router;