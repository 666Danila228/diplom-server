import BaseService from "../utils/baseService.js";
import prisma from "../../../prisma/prismaClient.js";

class FuelCardService extends BaseService {
    // Создание стандартной нормы расхода топлива
    async createFuelConsumptionRate(data) {
        return await this.createRecord(
            'FuelConsumptionRate',
            data,
            'Стандарт топлива на модели и тип машины'
        );
    }

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

    async updateFuelConsumptionRate(id, data) {
        return await this.updateRecord(
            'FuelConsumptionRate',
            id,
            data,
            'Стандарт топлива на модели и тип машины'
        );
    }

    // Проверка стандартной нормы для машины
    async checkFuelRateForCar(carId, fuelType) {
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

        const fuelRate = await prisma.fuelConsumptionRate.findUnique({
            where: {
                model_car_id_type_car_id_fuel_type: {
                    model_car_id: car.model_car_id,
                    type_car_id: car.type_car_id,
                    fuel_type: fuelType,
                },
            },
        });

        if (!fuelRate) {
            throw new Error("Стандартная норма расхода топлива не найдена");
        }

        return fuelRate;
    }

    // Создание топливной карты
    async createFuelCard(data) {
        const { car_id, fuels } = data; 

        const fuelCard = await prisma.fuelCard.create({
            data: {
                car_id,
                status: 'ACTIVE',
                FuelCardFuel: {
                    create: fuels.map((fuel) => ({
                        fuel_type: fuel.fuel_type,
                        daily_rate: fuel.daily_rate,
                        current_balance: fuel.daily_rate,
                    })),
                },
            },
            include: {
                FuelCardFuel: true, 
            },
        });

        return fuelCard;
    }

    // Получение всех топливных карт
    async getAllFuelCards(options = {}) {
        return await prisma.fuelCard.findMany({
            ...options,
            include: {
                FuelCardFuel: true, // Включаем данные о топливе
            },
        });
    }

    // Получение топливной карты по ID
    async getFuelCardById(id) {
        const fuelCard = await prisma.fuelCard.findUnique({
            where: { id },
            include: {
                FuelCardFuel: true, // Включаем данные о топливе
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
                FuelCardFuel: true, // Включаем данные о топливе
            },
        });

        if (!fuelCard) {
            throw new Error("Топливная карта для указанной машины не найдена");
        }

        return fuelCard;
    }

    // Обновление топливной карты
    async updateFuelCard(id, data) {
        const { fuels, ...rest } = data; // fuels - массив объектов с fuel_type и daily_rate

        // Обновляем основную информацию о карте
        const updatedFuelCard = await prisma.fuelCard.update({
            where: { id },
            data: rest,
            include: {
                FuelCardFuel: true, // Включаем данные о топливе
            },
        });

        // Обновляем данные о топливе
        if (fuels) {
            await Promise.all(
                fuels.map(async (fuel) => {
                    await prisma.FuelCardFuel.upsert({
                        where: {
                            fuel_card_id_fuel_type: {
                                fuel_card_id: id,
                                fuel_type: fuel.fuel_type,
                            },
                        },
                        update: {
                            daily_rate: fuel.daily_rate,
                            current_balance: fuel.current_balance,
                        },
                        create: {
                            fuel_card_id: id,
                            fuel_type: fuel.fuel_type,
                            daily_rate: fuel.daily_rate,
                            current_balance: fuel.daily_rate, // Начальный баланс равен дневной норме
                        },
                    });
                })
            );
        }

        return updatedFuelCard;
    }

    // Привязка водителя к топливной карте
    async assignUserToFuelCard(fuelCardId, userId) {
        const fuelCard = await prisma.fuelCard.findUnique({
            where: { id: fuelCardId },
        });

        if (!fuelCard) {
            throw new Error("Топливная карта не найдена");
        }

        const updatedFuelCard = await prisma.fuelCard.update({
            where: { id: fuelCardId },
            data: {
                user_id: userId,
                status: 'ASSIGNED',
            },
        });

        await prisma.fuelCardAssignmentHistory.create({
            data: {
                fuel_card_id: fuelCardId,
                user_id: userId,
                action: 'ASSIGN',
            },
        });

        return updatedFuelCard;
    }

    // Отвязка водителя от топливной карты
    async unassignUserFromFuelCard(fuelCardId) {
        const fuelCard = await prisma.fuelCard.findUnique({
            where: { id: fuelCardId },
        });

        if (!fuelCard) {
            throw new Error("Топливная карта не найдена");
        }

        const updatedFuelCard = await prisma.fuelCard.update({
            where: { id: fuelCardId },
            data: {
                user_id: null,
                status: 'ACTIVE',
            },
        });

        await prisma.fuelCardAssignmentHistory.create({
            data: {
                fuel_card_id: fuelCardId,
                user_id: fuelCard.user_id,
                action: 'UNASSIGN',
            },
        });

        return updatedFuelCard;
    }

    // Получение истории привязок для топливной карты
    async getFuelCardAssignmentHistory(fuelCardId) {
        return await prisma.fuelCardAssignmentHistory.findMany({
            where: { fuel_card_id: fuelCardId },
            orderBy: { created_at: 'desc' },
            include: {
                User: true,
            },
        });
    }

    // Создание записи в истории расходов топлива
    async createFuelCardHistory(data) {
        const { fuel_card_id, fuel_type, used_amount } = data;

        const fuelCardFuel = await prisma.fuelCardFuel.findUnique({
            where: {
                fuel_card_id_fuel_type: {
                    fuel_card_id,
                    fuel_type,
                },
            },
        });

        if (!fuelCardFuel) {
            throw new Error("Топливная карта или тип топлива не найдены");
        }

        if (used_amount > fuelCardFuel.current_balance) {
            throw new Error("Недостаточно топлива на карте");
        }

        const newBalance = fuelCardFuel.current_balance - used_amount;

        // Обновляем баланс топлива
        await prisma.fuelCardFuel.update({
            where: {
                fuel_card_id_fuel_type: {
                    fuel_card_id,
                    fuel_type,
                },
            },
            data: { current_balance: newBalance },
        });

        // Создаем запись в истории расходов
        return await prisma.fuelCardHistory.create({
            data: {
                fuel_card_id,
                fuel_type,
                used_amount,
                balance_after: newBalance,
            },
        });
    }
}

export default new FuelCardService();