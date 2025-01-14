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

    // Создание топливной карты
    async createFuelCard(data) {
        const { car_id } = data;
    
        const car = await prisma.car.findUnique({
            where: { id: car_id },
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
    
        const fuelCard = await prisma.fuelCard.create({
            data: {
                car_id,
                status: 'ACTIVE',
                FuelCardFuel: {
                    create: fuelRates.map((rate) => ({
                        fuel_type: rate.fuel_type,
                        daily_rate: rate.daily_rate,
                        current_balance: rate.daily_rate * 10,
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

    // Обновление топливной карты
    async updateFuelCard(id, data) {
        const { fuels, ...rest } = data; 

        const updatedFuelCard = await prisma.fuelCard.update({
            where: { id },
            data: rest,
            include: {
                FuelCardFuel: true, 
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
                            current_balance: fuel.daily_rate, 
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

