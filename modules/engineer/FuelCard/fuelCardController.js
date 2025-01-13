import BaseController from "../utils/baseController.js";
import FuelCardService from "./fuelCardService.js";
// import Schemas from "../../../validations/fuelCard/index.js";

class FuelCardController extends BaseController {
    // Создание стандартной нормы расхода топлива
    async createFuelConsumptionRate(req, res) {
        const data = req.body;

        await super.createRecord(
            req, res,
            () => FuelCardService.createFuelConsumptionRate(data),
            "Стандарт топлива на модели и тип машины",
            // Schemas.createFuelConsumptionRateSchema
        );
    }

    // Получение всех стандартных норм расхода топлива
    async getAllFuelConsumptionRates(req, res) {
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
            () => FuelCardService.getAllFuelConsumptionRates(options),
            "Стандарты топлива"
        );
    }

    // Получение стандартной нормы расхода топлива по ID
    async getFuelConsumptionRateById(req, res) {
        const { id } = req.params;

        await super.getRecordById(
            req, res,
            () => FuelCardService.getFuelConsumptionRateById(id),
            "Стандарт топлива на модели и тип машины"
        );
    }

    // Обновление стандартной нормы расхода топлива
    async updateFuelConsumptionRate(req, res) {
        const { id } = req.params;
        const data = req.body;

        await super.updateRecord(
            req, res,
            () => FuelCardService.updateFuelConsumptionRate(id, data),
            "Стандарт топлива на модели и тип машины",
            Schemas.updateFuelConsumptionRateSchema // Схема валидации, если есть
        );
    }

    // Создание топливной карты
    async createFuelCard(req, res) {
        const data = req.body;

        await super.createRecord(
            req, res,
            () => FuelCardService.createFuelCard(data),
            "Топливная карта",
            Schemas.createFuelCardSchema // Схема валидации, если есть
        );
    }

    // Получение всех топливных карт
    async getAllFuelCards(req, res) {
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
            () => FuelCardService.getAllFuelCards(options),
            "Топливные карты"
        );
    }

    // Получение топливной карты по ID
    async getFuelCardById(req, res) {
        const { id } = req.params;

        await super.getRecordById(
            req, res,
            () => FuelCardService.getFuelCardById(id),
            "Топливная карта"
        );
    }

    // Получение топливной карты по ID машины
    async getFuelCardByCarId(req, res) {
        const { carId } = req.params;

        try {
            const fuelCard = await FuelCardService.getFuelCardByCarId(parseInt(carId));
            res.status(200).json({ message: "Топливная карта найдена", fuelCard });
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: error.message });
        }
    }

    // Обновление топливной карты
    async updateFuelCard(req, res) {
        const { id } = req.params;
        const data = req.body;

        await super.updateRecord(
            req, res,
            () => FuelCardService.updateFuelCard(id, data),
            "Топливная карта",
            Schemas.updateFuelCardSchema // Схема валидации, если есть
        );
    }

    // Привязка водителя к топливной карте
    async assignUserToFuelCard(req, res) {
        const { fuelCardId, userId } = req.body;

        try {
            const updatedFuelCard = await FuelCardService.assignUserToFuelCard(fuelCardId, userId);
            res.status(200).json({ message: "Водитель успешно привязан к топливной карте", fuelCard: updatedFuelCard });
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: error.message });
        }
    }

    // Отвязка водителя от топливной карты
    async unassignUserFromFuelCard(req, res) {
        const { fuelCardId } = req.body;

        try {
            const updatedFuelCard = await FuelCardService.unassignUserFromFuelCard(fuelCardId);
            res.status(200).json({ message: "Водитель успешно отвязан от топливной карты", fuelCard: updatedFuelCard });
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: error.message });
        }
    }

    // Получение истории привязок для топливной карты
    async getFuelCardAssignmentHistory(req, res) {
        const { fuelCardId } = req.params;

        try {
            const history = await FuelCardService.getFuelCardAssignmentHistory(parseInt(fuelCardId));
            res.status(200).json({ message: "История привязок получена", history });
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: error.message });
        }
    }

    // Создание записи в истории расходов топлива
    async createFuelCardHistory(req, res) {
        const data = req.body;

        try {
            const historyRecord = await FuelCardService.createFuelCardHistory(data);
            res.status(201).json({ message: "Запись в истории расходов топлива создана", historyRecord });
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: error.message });
        }
    }
}

export default new FuelCardController();