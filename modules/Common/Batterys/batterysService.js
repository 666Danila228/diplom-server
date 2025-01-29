import BaseService from '../../utils/baseService.js';
import prisma from '../../../prisma/prismaClient.js';

class batteryService extends BaseService {

    async getAllBrandbattery() {
        return super.getAllRecords('brandbattery');
    }

    async getBrandbatteryById(id) {
        return this.getRecordById('brandbattery', id, 'Бренд дисков');
    }

    // Модели дисков
    async getAllModelbatterys() {
        return super.getAllRecords('modelbattery');
    }

    async getModelbatteryById(id) {
        return this.getRecordById('modelbattery', id, 'модель шин');
    }

    // Диск

    async getAllbatterys() {
        return super.getAllRecords('battery');
    }

    async getbatteryById(id) {
        return this.getRecordById('battery', id, 'шина');
    }
}

export default new batteryService();