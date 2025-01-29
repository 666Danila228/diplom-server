import BaseController from "../../utils/baseController.js";
import FuelCardService from "./fuelCardService.js";
// import Schemas from "../../../validations/fuelCard/index.js";

class FuelCardController extends BaseController {
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
}

export default new FuelCardController();