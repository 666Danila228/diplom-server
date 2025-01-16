import BaseService from "../utils/baseService.js";
import prisma from "../../../prisma/prismaClient.js";
import { addDays, isWeekend, nextMonday } from 'date-fns';
import Schemas from "../../../validations/engineer/TO/index.js"; // Импортируем ваши схемы Joi

class TOService extends BaseService {

    // Создание запланированного ТО при создании машины
    async scheduleInitialTO(carId, typeCarId) {
        const typeCar = await prisma.typeCar.findUnique({
            where: { id: typeCarId },
        });
    
        if (!typeCar) {
            throw new Error('Тип машины не найден');
        }
    
        const car = await prisma.car.findUnique({
            where: { id: carId },
            include: { Service: true }, 
        });
    
        if (!car) {
            throw new Error('Машина не найдена');
        }
    
        const scheduledDate = new Date();
        scheduledDate.setDate(scheduledDate.getDate() + typeCar.interval_to);
    
        return this.createRecord('TOHistory', {
            scheduled_date: scheduledDate,
            status: 'SCHEDULED',
            to_type: 'SCHEDULED',
            description: 'Первое плановое ТО',
            Car: {
                connect: { id: carId }, 
            },
            Service: {
                connect: { id: car.service_id }
            },
        }, 'запланированное ТО');
    }
    
    async getAllTO(options = {}) {
        return super.getAllRecords('TOHistory', options);
    }

    // Добавление расходных материалов к ТО
    async addConsumables(toHistoryId, consumables) {
        const to = await this.getRecordById('TOHistory', toHistoryId, 'ТО', {
            include: { Car: true }, 
        });

        const garageId = to.Car.garage_id; 

        for (const consumable of consumables) {
            const { consumableId, quantityUsed } = consumable;

            const material = await prisma.consumable.findUnique({
                where: { id: consumableId },
                include: { EngineOil: true, Coolant: true },
            });

            if (!material) {
                throw new Error(`Расходный материал с ID ${consumableId} не найден`);
            }

            let materialGarageId;
            let materialVolume;
            if (material.material_type === 'EngineOil') {
                materialGarageId = material.EngineOil?.garage_id;
                materialVolume = material.EngineOil?.volume;
            } else if (material.material_type === 'Coolant') {
                materialGarageId = material.Coolant?.garage_id;
                materialVolume = material.Coolant?.volume;
            }

            if (materialGarageId !== garageId) {
                throw new Error(`Расходный материал с ID ${consumableId} не принадлежит гаражу машины`);
            }

            if (materialVolume < quantityUsed) {
                throw new Error(`Недостаточно материала (ID: ${consumableId}) для списания. Доступно: ${materialVolume}, требуется: ${quantityUsed}`);
            }

            await this.createRecord('TOConsumable', {
                to_history_id: toHistoryId,
                consumable_id: consumableId,
                quantity_used: quantityUsed,
            }, 'использованный материал');

            if (material.material_type === 'EngineOil') {
                await prisma.engineOil.update({
                    where: { id: material.EngineOil.id },
                    data: { volume: { decrement: quantityUsed } },
                });
            } else if (material.material_type === 'Coolant') {
                await prisma.coolant.update({
                    where: { id: material.Coolant.id },
                    data: { volume: { decrement: quantityUsed } },
                });
            }
        }
    }

    // Завершение ТО и создание следующего запланированного ТО
    async completeTO(toId, data) {
        // Валидация данных перед завершением ТО
        await this.validateData(Schemas.completeTO, data);

        const to = await this.getRecordById('TOHistory', toId, 'ТО', {
            include: { Car: { include: { TypeCar: true } } }, // Включаем информацию о машине и типе машины
        });

        // Обновление текущего ТО
        const updatedTO = await this.updateRecord('TOHistory', toId, {
            status: 'COMPLETED',
            completed_at: new Date(),
            ...data,
        }, 'ТО');

        // Добавление расходных материалов, если они указаны
        if (data.consumables && data.consumables.length > 0) {
            await this.addConsumables(toId, data.consumables);
        }

        // Создание следующего запланированного ТО
        const nextScheduledDate = new Date(to.scheduled_date);
        nextScheduledDate.setDate(nextScheduledDate.getDate() + to.Car.TypeCar.interval_to);

        await this.createRecord('TOHistory', {
            car_id: to.car_id,
            scheduled_date: nextScheduledDate,
            status: 'SCHEDULED',
            to_type: 'SCHEDULED',
            description: 'Следующее плановое ТО',
        }, 'следующее запланированное ТО');

        return updatedTO;
    }

    // Отмена ТО и перенос на следующий рабочий день
    async cancelTO(toId, reason) {
        const to = await this.getRecordById('TOHistory', toId, 'ТО');

        let newScheduledDate = addDays(to.scheduled_date, 1);
        if (isWeekend(newScheduledDate)) {
            newScheduledDate = nextMonday(newScheduledDate);
        }

        return this.updateRecord('TOHistory', toId, {
            status: 'CANCELLED',
            reason,
            scheduled_date: newScheduledDate,
        }, 'отмененное ТО');
    }

    // Принятие заявки на ТО мастером
    async acceptTO(toId, masterId) {
        return this.updateRecord('TOHistory', toId, {
            status: 'IN_PROGRESS',
            master_id: masterId,
        }, 'ТО в работе');
    }

    // Получение списка ТО для машины
    async getTOHistoryByCarId(carId) {
        return this.getAllRecords('TOHistory', {
            where: { car_id: parseInt(carId, 10) },
            include: { TOConsumables: { include: { Consumable: true } } },
        });
    }

    // Получение списка расходных материалов для ТО
    async getConsumablesByTOId(toId) {
        const to = await this.getRecordById('TOHistory', toId, 'ТО', {
            include: { TOConsumables: { include: { Consumable: true } } },
        });
        return to.TOConsumables;
    }
}

export default new TOService();