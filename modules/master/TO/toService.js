import BaseService from "../../utils/baseService";
import prisma from "../../../prisma/prismaClient";

class TOService extends BaseService {
    // Добавление расходных материалов к ТО
    async addConsumables(toHistoryId, consumables) {
        console.log('toHistoryId:', toHistoryId);
        console.log('consumables:', consumables);
    
        const to = await this.getRecordById('TOHistory', parseInt(toHistoryId), 'ТО', ['Car']);
    
        console.log('TOHistory record:', to);
    
        if (!to.Car) {
            throw new Error('Запись ТО не имеет связанной машины');
        }
    
        if (!to.Car.garage_id) {
            throw new Error('Машина не привязана к гаражу');
        }
    
        const garageId = to.Car.garage_id;
    
        for (const consumable of consumables) {
            console.log('Обработка расходного материала:', consumable);
    
            const { consumableId, quantityUsed } = consumable;

            const material = await prisma.consumable.findUnique({
                where: { id: consumableId },
            });
    
            if (!material) {
                throw new Error(`Расходный материал с ID ${consumableId} не найден`);
            }
    
            let materialGarageId;
            let materialVolume;

            if (material.material_type === 'EngineOil') {
                const engineOil = await prisma.engineOil.findUnique({
                    where: { id: material.material_id },
                });
    
                if (!engineOil) {
                    throw new Error(`Моторное масло с ID ${material.material_id} не найдено`);
                }
    
                materialGarageId = engineOil.garage_id;
                materialVolume = engineOil.volume;
            } else if (material.material_type === 'Coolant') {
                const coolant = await prisma.coolant.findUnique({
                    where: { id: material.material_id },
                });
    
                if (!coolant) {
                    throw new Error(`Охлаждающая жидкость с ID ${material.material_id} не найдена`);
                }
    
                materialGarageId = coolant.garage_id;
                materialVolume = coolant.volume;
            } else {
                throw new Error(`Неизвестный тип материала: ${material.material_type}`);
            }
    
            if (materialGarageId !== garageId) {
                throw new Error(`Расходный материал с ID ${consumableId} не принадлежит гаражу машины`);
            }
    
            if (materialVolume < quantityUsed) {
                throw new Error(`Недостаточно материала (ID: ${consumableId}) для списания. Доступно: ${materialVolume}, требуется: ${quantityUsed}`);
            }
    
            await this.createRecord('TOConsumable', {
                to_history_id: parseInt(toHistoryId,10),
                consumable_id: consumableId,
                quantity_used: quantityUsed,
            }, 'использованный материал');
    
            if (material.material_type === 'EngineOil') {
                await prisma.engineOil.update({
                    where: { id: material.material_id },
                    data: { volume: { decrement: quantityUsed } },
                });
            } else if (material.material_type === 'Coolant') {
                await prisma.coolant.update({
                    where: { id: material.material_id },
                    data: { volume: { decrement: quantityUsed } },
                });
            }
        }
    }

    // Завершение ТО и создание следующего запланированного ТО
    async completeTO(toId, data) {
        await this.validateData(Schemas.completeTO, data);

        const to = await this.getRecordById('TOHistory', toId, 'ТО', {
            include: { Car: { include: { TypeCar: true } } }, 
        });

        const updatedTO = await this.updateRecord('TOHistory', toId, {
            status: 'COMPLETED',
            completed_at: new Date(),
            ...data,
        }, 'ТО');

        if (data.consumables && data.consumables.length > 0) {
            await this.addConsumables(toId, data.consumables);
        }

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

}