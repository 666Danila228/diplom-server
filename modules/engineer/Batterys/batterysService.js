import BaseService from "../utils/baseService.js";

class BatteryService extends BaseService {
    // Бренд
    async createBrandBattery(name) {
        return this.createRecord('brandBattery', { name }, 'бренд аккумулятора');
    }

    async getlAllBranвBattery() {
        return this.getAllRecords('brandBattery');
    }

    async getBrandBatteryById(id) {
        return this.getRecordById('brandBattery', id, 'бренд аккумулятора');
    }

    async updateBrandBattery(id, name) {
        return this.updateRecord('brandBattery', id, { name }, 'бренд аккумулятора');
    }

    // Модель
    async createModelBattery(name) {
        return this.createRecord('modelBattery', { name }, 'модель аккумулятора');
    }

    async getlAllModelBattery() {
        return this.getAllRecords('modelBattery');
    }

    async getModelBatteryById(id) {
        return this.getRecordById('modelBattery', id, 'модель аккумулятора');
    }

    async updateModelBattery(id, data) {
        return this.updateRecord('modelBattery', id, data, 'модель аккумулятора', ['brandBattery']);
    }

    // Баттарея
    async createBattery(data) {
        return this.createRecord('battery', data, 'аккумулятор', ['modelBattery', 'brandBattery']);
    }

    async getAllBattery() {
        return this.getAllRecords('battery');
    }

    async getBatteryById(id) {
        return this.getRecordById('battery', id, 'аккумулятор');
    }

    async updateBattery(id, data) {
        return this.updateRecord('battery', id, data, 'аккумулятор', ['modelBattery', 'brandBattery']);
    }
}

export default new BatteryService();