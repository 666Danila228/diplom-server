import Schemas from '../../../validations/engineer/TO/index.js'; // Импортируем схемы валидации
import BaseController from '../../utils/baseController.js';
import TOService from './toService.js';

class TOController extends BaseController {

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
        const { id } = req.params;

        try {
            const consumables = await TOService.getConsumablesByTOId(parseInt(id, 10));
            res.status(200).json(consumables);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    
}

export default new TOController();