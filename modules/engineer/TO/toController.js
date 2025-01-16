import Schemas from '../../../validations/engineer/TO/index.js'; // Импортируем схемы валидации
import BaseController from '../utils/baseController.js';
import TOService from './toService.js';

class TOController extends BaseController {
    // Создание запланированного ТО
    async createTO(req, res) {
        await super.createRecord(
            req, res,
            (data) => TOService.createTO(data),
            'Запланированное ТО',
            Schemas.createTOHistory
        );
    }

    // Получение всех записей ТО
    async getAllTO(req, res) {
        const { where, orderBy, include, skip, take } = req.query;

        const options = {
            where: where ? JSON.parse(where) : undefined,
            orderBy: orderBy ? JSON.parse(orderBy) : undefined,
            include: include ? JSON.parse(include) : undefined,
            skip: skip ? parseInt(skip) : undefined,
            take: take ? parseInt(take) : undefined,
        };

        await super.getAllRecords(
            req, res,
            () => TOService.getAllTO(options),
            'записей ТО');
    }

    // Получение записи ТО по ID
    async getTOById(req, res) {
        await super.getRecordById(
            req, res,
            (id) => TOService.getTOById(id),
            'Запись ТО'
        );
    }

    async addConsumables(req, res) {
        const { toId } = req.params; 
        const { consumables } = req.body; 

        await super.createRecord(
            req, res,
            () => TOService.addConsumables(toId, consumables),
            'Добавление расходных материалов',
            Schemas.consumableSchema
        )
    }
    

    // Обновление записи ТО
    async updateTO(req, res) {
        await super.updateRecord(
            req, res,
            (id, data) => TOService.updateTO(id, data),
            'Запись ТО',
            Schemas.updateTOHistory
        );
    }

    // Удаление записи ТО
    async deleteTO(req, res) {
        const { id } = req.params;
        await super.deleteRecord(
            req, res,
            () => TOService.deleteTO(id),
            'Запись ТО'
        );
    }

    // Удаление нескольких записей ТО
    async deleteManyTO(req, res) {
        const { ids } = req.body;
        await super.deleteManyRecords(
            req, res,
            () => TOService.deleteManyTO(ids),
            'Записи ТО'
        );
    }

    // Завершение ТО
    async completeTO(req, res) {
        const { id } = req.params;
        const data = req.body;

        // Валидация данных перед завершением ТО
        await super.validateData(Schemas.completeTO, data);

        try {
            const updatedTO = await TOService.completeTO(id, data);
            res.status(200).json(updatedTO);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    // Отмена ТО
    async cancelTO(req, res) {
        const { id } = req.params;
        const { reason } = req.body;

        try {
            const updatedTO = await TOService.cancelTO(id, reason);
            res.status(200).json(updatedTO);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    // Принятие заявки на ТО мастером
    async acceptTO(req, res) {
        const { id } = req.params;
        const { masterId } = req.body;

        try {
            const updatedTO = await TOService.acceptTO(id, masterId);
            res.status(200).json(updatedTO);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    // Получение списка ТО для машины
    async getTOHistoryByCarId(req, res) {
        const { carId } = req.params;

        try {
            const toHistory = await TOService.getTOHistoryByCarId(carId);
            res.status(200).json(toHistory);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    // Получение списка расходных материалов для ТО
    async getConsumablesByTOId(req, res) {
        const { toId } = req.params;

        try {
            const consumables = await TOService.getConsumablesByTOId(toId);
            res.status(200).json(consumables);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

export default new TOController();