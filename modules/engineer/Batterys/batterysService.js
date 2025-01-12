import BaseService from '../utils/baseService.js';
import prisma from '../../../prisma/prismaClient.js';

class batteryService extends BaseService {
    // Проверка связанных записей для Brandbattery
    async checkBrandbatteryRelatedRecords(id) {
        const modelbatteryCount = await prisma.modelbattery.count({
            where: { brand_id: parseInt(id) },
        });
        return modelbatteryCount > 0;
    }

    // Проверка связанных записей для Modelbattery
    async checkModelbatteryRelatedRecords(id) {
        const batteryCount = await prisma.battery.count({
            where: { model_id: parseInt(id) },
        });
        return batteryCount > 0;
    }

    // Проверка связанных записей для battery
    async checkbatteryRelatedRecords(id) {
        const batteryHistoryCount = await prisma.batteryHistory.count({
            where: { battery_id: parseInt(id) },
        });
        return batteryHistoryCount > 0;
    }

    // Переопределение метода isRecordUsed для конкретных моделей
    async isRecordUsed(model, id) {
        switch (model) {
            case 'brandbattery':
                return this.checkBrandbatteryRelatedRecords(id);
            case 'modelbattery':
                return this.checkModelbatteryRelatedRecords(id);
            case 'battery':
                return this.checkbatteryRelatedRecords(id);
            default:
                throw new Error(`Метод isRecordUsed не реализован для модели ${model}`);
        }
    }

    async createBrandbattery(name) {
        return this.createRecord('brandbattery', { name }, 'бренд диска');
    }

    async getAllBrandbattery() {
        return super.getAllRecords('brandbattery');
    }

    async getBrandbatteryById(id) {
        return this.getRecordById('brandbattery', id, 'Бренд дисков');
    }

    async updateBrandbattery(id, name) {
        return this.updateRecord('brandbattery', id, { name }, 'Бренд диска');
    }

    async deleteBrandbattery(id) {
        const isUsed = await this.checkBrandbatteryRelatedRecords(id);
        return this.deleteRecord('brandbattery', id, 'Бренд диска', isUsed);
    }

    async deleteManyBrandbattery(ids) {
        return this.deleteManyRecords('brandbattery', ids, 'Бренды дисков')
    }


    // Модели дисков
    async createModelbattery(data) {
        return this.createRecord('modelbattery', data, 'модель дисков', ['Brandbattery']);
    }

    async getAllModelbatterys() {
        return super.getAllRecords('modelbattery');
    }

    async getModelbatteryById(id) {
        return this.getRecordById('modelbattery', id, 'модель шин');
    }

    async updateModelbattery(id, data) {
        return this.updateRecord('modelbattery', id, data, 'модель шин', ['Brandbattery']);
    }

    async deleteModelbattery(id) {
        const isUsed = await this.checkModelbatteryRelatedRecords(id);
        return this.deleteRecord('modelbattery', id, 'Модель шин', isUsed);
    }

    async deleteManyModelbatterys(ids) {
        return this.deleteManyRecords('modelbattery', ids, 'Модели шин');
    }

    // Диск

    async createbattery(data) {
        return this.createRecord('battery', data, 'шина', ['modelbattery', 'garage']);
    }

    async getAllbatterys() {
        return super.getAllRecords('battery');
    }

    async getbatteryById(id) {
        return this.getRecordById('battery', id, 'шина');
    }

    async updatebattery(id, data) {
        return this.updateRecord('battery', id, data, 'шина', ['modelbattery', 'garage']);
    }

    async deletebattery(id) {
        const isUsed = await this.checkbatteryRelatedRecords(id);
        return this.deleteRecord('battery', id, 'Шина', isUsed);
    }

    async deleteManybatterys(ids) {
        return this.deleteManyRecords('battery', ids, 'Шины');
    }

    async isbatteryInUse(batteryId) {
        const batteryOnbattery = await prisma.batteryOnbattery.findFirst({
            where: {
                battery_id: parseInt(batteryId),
                status: 'IN_USE', // Проверяем только активные записи
            },
        });
        return !!batteryOnbattery; // Возвращает true, если шина используется
    }

    async batteryWriteOff(data) {
        const isInUse = await this.isbatteryInUse(data.battery_id);
        if (isInUse) {
            throw new Error('Шина используется и не может быть списана');
        }
        console.log(isInUse)
        return this.createRecord('batteryWriteOff', data, 'шина', ['battery'])
    }
}

export default new batteryService();