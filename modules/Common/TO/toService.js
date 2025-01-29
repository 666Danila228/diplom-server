import BaseService from "../../utils/baseService.js";
import CoolantService from "../Coolant/coolantService.js";
import EngineOilService from "../EngineOil/engineOilService.js";
import prisma from "../../../prisma/prismaClient.js";
import { addDays, isWeekend, nextMonday } from 'date-fns';
import Schemas from "../../../validations/engineer/TO/index.js"; // Импортируем ваши схемы Joi

class TOService extends BaseService {

    async getAllTO(options = {}) {
        return super.getAllRecords('TOHistory', options);
    }

    async getTOById(id) {
        return this.getRecordById('TOHistory', id)
    }

    // Получение списка ТО для машины
    async getTOHistoryByCarId(carId) {
        return this.getAllRecords('TOHistory', {
            where: { car_id: parseInt(carId, 10) },
            include: { TOConsumables: { include: { Consumable: true } } },
        });
    }

    async getConsumablesByTOId(toId) {
        const to = await this.getRecordById('TOHistory', parseInt(toId), 'ТО', {
            TOConsumables: { 
                include: {
                    Consumable: true,
                },
            },
        });
        return to.TOConsumables;
    }

    async getFullConsumableInfo(consumableId) {
        return this.getAllRecords('Consumable', {
            where: { id: consumableId },
            include: {
                ModelCoolant: {
                    include: {
                        brand: true,
                    },
                },
            },
        });
    }
}

export default new TOService();