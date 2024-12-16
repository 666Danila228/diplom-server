import BaseService from '../utils/baseService.js';

class TiresService extends BaseService {
    // Бренд шин
    async createBrandTire(name) {
        return this.createRecord('brandTire', { name }, 'бренд шин');
    }

    async getAllBrandTires() {
        return super.getAllRecords('brandTire');
    }

    async getBrandTireById(id) {
        return this.getRecordById('brandTire', id, 'Бренд шин');
    }

    async updateBrandTire(id, name) {
        return this.updateRecord('brandTire', id, { name }, 'бренд шин');
    }


    // Модели шин
    async createModelTire(data) {
        return this.createRecord('modelTire', data, 'модель шин', ['BrandTire']);
    }

    async getAllModelTires() {
        return super.getAllRecords('modelTire');
    }

    async getModelTireById(id) {
        return this.getRecordById('modelTire', id, 'модель шин');
    }

    async updateModelTire(id, data) {
        return this.updateRecord('modelTire', id, data, 'модель шин', ['BrandTire']);
    }
    
    // Шина

    async createTire(data) {
        return this.createRecord('tire', data, 'шина', ['modelTire', 'garage']);
    }

    async getAllTires() {
        return super.getAllRecords('tire');
    }

    async getTireById(id) {
        return this.getRecordById('tire', id, 'шина');
    }

    async updateTire(id, data) {
        return this.updateRecord('tire', id, data, 'шина', ['modelTire', 'garage']);
    }
}

export default new TiresService();