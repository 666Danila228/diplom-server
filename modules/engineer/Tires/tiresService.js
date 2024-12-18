import BaseService from '../utils/baseService.js';
import prisma from '../../../prisma/prismaClient.js';

class TiresService extends BaseService {
    // Проверка связанных записей для BrandTire
    async checkBrandTireRelatedRecords(id) {
        const modelTireCount = await prisma.modelTire.count({
            where: { brand_id: parseInt(id) },
        });
        return modelTireCount > 0;
    }

    // Проверка связанных записей для ModelTire
    async checkModelTireRelatedRecords(id) {
        const tireCount = await prisma.tire.count({
            where: { model_id: parseInt(id) },
        });
        return tireCount > 0;
    }

    // Проверка связанных записей для Tire
    async checkTireRelatedRecords(id) {
        const tireHistoryCount = await prisma.tireHistory.count({
            where: { tire_id: parseInt(id) },
        });
        return tireHistoryCount > 0;
    }

    // Переопределение метода isRecordUsed для конкретных моделей
    async isRecordUsed(model, id) {
        switch (model) {
            case 'brandTire':
                return this.checkBrandTireRelatedRecords(id);
            case 'modelTire':
                return this.checkModelTireRelatedRecords(id);
            case 'tire':
                return this.checkTireRelatedRecords(id);
            default:
                throw new Error(`Метод isRecordUsed не реализован для модели ${model}`);
        }
    }
  


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

    async deleteBrandTire(id) {
        const isUsed = await this.checkBrandTireRelatedRecords(id);
        return this.deleteRecord('brandTire', id, 'Бренд шин', isUsed);
    }

    // Удаление нескольких записей BrandTire
    async deleteManyBrandTires(ids) {
        return this.deleteManyRecords('brandTire', ids, 'Бренды шин');
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

    async deleteModelTire(id) {
        const isUsed = await this.checkModelTireRelatedRecords(id);
        return this.deleteRecord('modelTire', id, 'Модель шин', isUsed);
    }

    // Удаление нескольких записей ModelTire
    async deleteManyModelTires(ids) {
        return this.deleteManyRecords('modelTire', ids, 'Модели шин');
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

    async deleteTire(id) {
        const isUsed = await this.checkTireRelatedRecords(id);
        return this.deleteRecord('tire', id, 'Шина', isUsed);
    }

    // Удаление нескольких записей Tire
    async deleteManyTires(ids) {
        return this.deleteManyRecords('tire', ids, 'Шины');
    }
}

export default new TiresService();