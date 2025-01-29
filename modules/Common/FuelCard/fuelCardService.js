import BaseService from "../../utils/baseService.js";
import prisma from "../../../prisma/prismaClient.js";

class FuelCardService extends BaseService {
    // Создание стандартной нормы расхода топлива

    async getAllFuelConsumptionRates(options = {}) {
        return await this.getAllRecords('FuelConsumptionRate', options);
    }

    async getFuelConsumptionRateById(id) {
        return await this.getRecordById(
            'FuelConsumptionRate',
            id,
            'Стандарт топлива на модели и тип машины'
        );
    }

    // Проверка стандартной нормы для машины
    async checkFuelRateForCar(carId) {
        const car = await prisma.car.findUnique({
            where: { id: carId },
            include: {
                ModelCar: true,
                TypeCar: true,
            },
        });
    
        if (!car) {
            throw new Error("Машина не найдена");
        }

        const fuelRates = await prisma.fuelConsumptionRate.findMany({
            where: {
                model_car_id: car.model_car_id,
                type_car_id: car.type_car_id,
            },
        });
    
        if (fuelRates.length === 0) {
            throw new Error("Стандартные нормы расхода топлива для машины не найдены");
        }
    
        return fuelRates;
    }


    // Получение всех топливных карт
    async getAllFuelCards(options = {}) {
        return await prisma.fuelCard.findMany({
            ...options,
            include: {
                FuelCardFuel: true,
            },
        });
    }

    // Получение топливной карты по ID
    async getFuelCardById(id) {
        const fuelCard = await prisma.fuelCard.findUnique({
            where: { id },
            include: {
                FuelCardFuel: true, 
            },
        });

        if (!fuelCard) {
            throw new Error("Топливная карта не найдена");
        }

        return fuelCard;
    }

    // Получение топливной карты по ID машины
    async getFuelCardByCarId(carId) {
        const fuelCard = await prisma.fuelCard.findFirst({
            where: { car_id: carId },
            include: {
                FuelCardFuel: true, 
            },
        });

        if (!fuelCard) {
            throw new Error("Топливная карта для указанной машины не найдена");
        }

        return fuelCard;
    }

}

export default new FuelCardService();

