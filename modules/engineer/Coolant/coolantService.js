import BaseService from '../utils/baseService.js';
import prisma from '../../../prisma/prismaClient.js';

class CoolantsService extends BaseService {
    // Проверка связанных записей для BrandCoolant
    async checkBrandCoolantRelatedRecords(id) {
        const modelCoolantCount = await prisma.modelCoolant.count({
            where: { brand_id: parseInt(id) },
        });
        return modelCoolantCount > 0;
    }

    // Проверка связанных записей для ModelCoolant
    async checkModelCoolantRelatedRecords(id) {
        const CoolantCount = await prisma.Coolant.count({
            where: { model_id: parseInt(id) },
        });
        return CoolantCount > 0;
    }

    // Проверка связанных записей для Coolant
    async checkCoolantRelatedRecords(id) {
        const CoolantHistoryCount = await prisma.CoolantHistory.count({
            where: { Coolant_id: parseInt(id) },
        });
        return CoolantHistoryCount > 0;
    }

    // Переопределение метода isRecordUsed для конкретных моделей
    async isRecordUsed(model, id) {
        switch (model) {
            case 'brandCoolant':
                return this.checkBrandCoolantRelatedRecords(id);
            case 'modelCoolant':
                return this.checkModelCoolantRelatedRecords(id);
            case 'Coolant':
                return this.checkCoolantRelatedRecords(id);
            default:
                throw new Error(`Метод isRecordUsed не реализован для модели ${model}`);
        }
    }
  


    // Бренд тасола
    async createBrandCoolant(name) {
        return this.createRecord('brandCoolant', { name }, 'бренд тасола');
    }

    async getAllBrandCoolants() {
        return super.getAllRecords('brandCoolant');
    }

    async getBrandCoolantById(id) {
        return this.getRecordById('brandCoolant', id, 'Бренд тасола');
    }

    async updateBrandCoolant(id, name) {
        return this.updateRecord('brandCoolant', id, { name }, 'бренд тасола');
    }

    async deleteBrandCoolant(id) {
        const isUsed = await this.checkBrandCoolantRelatedRecords(id);
        return this.deleteRecord('brandCoolant', id, 'Бренд тасола', isUsed);
    }

    async deleteManyBrandCoolants(ids) {
        return this.deleteManyRecords('brandCoolant', ids, 'Бренды тасола');
    }


    // Модели тасола
    async createModelCoolant(data) {
        return this.createRecord('modelCoolant', data, 'модель тасола', ['BrandCoolant']);
    }

    async getAllModelCoolants() {
        return super.getAllRecords('modelCoolant');
    }

    async getModelCoolantById(id) {
        return this.getRecordById('modelCoolant', id, 'модель тасола');
    }

    async updateModelCoolant(id, data) {
        return this.updateRecord('modelCoolant', id, data, 'модель тасола', ['BrandCoolant']);
    }

    async deleteModelCoolant(id) {
        const isUsed = await this.checkModelCoolantRelatedRecords(id);
        return this.deleteRecord('modelCoolant', id, 'Модель тасола', isUsed);
    }

    async deleteManyModelCoolants(ids) {
        return this.deleteManyRecords('modelCoolant', ids, 'Модели тасола');
    }
    
    // тасолаа

    async createCoolant(data) {
        return this.createRecord('Coolant', data, 'тасолаа', ['modelCoolant', 'garage']);
    }

    async getAllCoolants() {
        return super.getAllRecords('Coolant');
    }

    async getCoolantById(id) {
        return this.getRecordById('Coolant', id, 'тасолаа');
    }

    async updateCoolant(id, data) {
        return this.updateRecord('Coolant', id, data, 'тасолаа', ['modelCoolant', 'garage']);
    }

    async deleteCoolant(id) {
        const isUsed = await this.checkCoolantRelatedRecords(id);
        return this.deleteRecord('Coolant', id, 'тасолаа', isUsed);
    }

    async deleteManyCoolants(ids) {
        return this.deleteManyRecords('Coolant', ids, 'тасолаы');
    }

    async isCoolantInUse(CoolantId) {
        const CoolantOnDisk = await prisma.CoolantOnDisk.findFirst({
            where: {
                Coolant_id: parseInt(CoolantId),
                status: 'IN_USE', // Проверяем только активные записи
            },
        });
        return !!CoolantOnDisk; // Возвращает true, если тасолаа используется
    }

    async CoolantWriteOff(data) {
        const isInUse = await this.isCoolantInUse(data.Coolant_id);
        if (isInUse) {
            throw new Error('тасолаа используется и не может быть списана');
        }
        console.log(isInUse)
        return this.createRecord('CoolantWriteOff', data, 'тасолаа', ['Coolant'])
    }


}

export default new CoolantsService();