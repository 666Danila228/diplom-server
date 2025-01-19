import BaseService from '../utils/baseService.js';
import prisma from '../../../prisma/prismaClient.js';

class EngineOilsService extends BaseService {
    // Проверка связанных записей для BrandEngineOil
    async checkBrandEngineOilRelatedRecords(id) {
        const modelEngineOilCount = await prisma.modelEngineOil.count({
            where: { brand_id: parseInt(id) },
        });
        return modelEngineOilCount > 0;
    }

    // Проверка связанных записей для ModelEngineOil
    async checkModelEngineOilRelatedRecords(id) {
        const EngineOilCount = await prisma.EngineOil.count({
            where: { model_id: parseInt(id) },
        });
        return EngineOilCount > 0;
    }

    // Проверка связанных записей для EngineOil
    async checkEngineOilRelatedRecords(id) {
        const EngineOilHistoryCount = await prisma.EngineOilHistory.count({
            where: { EngineOil_id: parseInt(id) },
        });
        return EngineOilHistoryCount > 0;
    }

    // Переопределение метода isRecordUsed для конкретных моделей
    async isRecordUsed(model, id) {
        switch (model) {
            case 'brandEngineOil':
                return this.checkBrandEngineOilRelatedRecords(id);
            case 'modelEngineOil':
                return this.checkModelEngineOilRelatedRecords(id);
            case 'EngineOil':
                return this.checkEngineOilRelatedRecords(id);
            default:
                throw new Error(`Метод isRecordUsed не реализован для модели ${model}`);
        }
    }
  


    // Бренд Моторных масел
    async createBrandEngineOil(name) {
        return this.createRecord('brandEngineOil', { name }, 'бренд Моторных масел');
    }

    async getAllBrandEngineOils() {
        return super.getAllRecords('brandEngineOil');
    }

    async getBrandEngineOilById(id) {
        return this.getRecordById('brandEngineOil', id, 'Бренд Моторных масел');
    }

    async updateBrandEngineOil(id, name) {
        return this.updateRecord('brandEngineOil', id, { name }, 'бренд Моторных масел');
    }

    async deleteBrandEngineOil(id) {
        const isUsed = await this.checkBrandEngineOilRelatedRecords(id);
        return this.deleteRecord('brandEngineOil', id, 'Бренд Моторных масел', isUsed);
    }

    async deleteManyBrandEngineOils(ids) {
        return this.deleteManyRecords('brandEngineOil', ids, 'Бренды Моторных масел');
    }


    // Модели Моторных масел
    async createModelEngineOil(data) {
        return this.createRecord('modelEngineOil', data, 'модель Моторных масел', ['BrandEngineOil']);
    }

    async getAllModelEngineOils() {
        return super.getAllRecords('modelEngineOil');
    }

    async getModelEngineOilById(id) {
        return this.getRecordById('modelEngineOil', id, 'модель Моторных масел');
    }

    async updateModelEngineOil(id, data) {
        return this.updateRecord('modelEngineOil', id, data, 'модель Моторных масел', ['BrandEngineOil']);
    }

    async deleteModelEngineOil(id) {
        const isUsed = await this.checkModelEngineOilRelatedRecords(id);
        return this.deleteRecord('modelEngineOil', id, 'Модель Моторных масел', isUsed);
    }

    async deleteManyModelEngineOils(ids) {
        return this.deleteManyRecords('modelEngineOil', ids, 'Модели Моторных масел');
    }
    
    // Моторное масло

    async createEngineOil(data) {
        const engineOil = await this.createRecord('EngineOil', data, 'Моторное масло', ['modelEngineOil', 'garage'])
        await this.createRecord('Consumable', { material_type: 'EngineOil', material_id: engineOil.id }, 'Расходный материал')
        return engineOil;
    }

    async getAllEngineOils() {
        return super.getAllRecords('EngineOil');
    }

    async getEngineOilById(id) {
        return this.getRecordById('EngineOil', id, 'Моторное масло');
    }

    async updateEngineOil(id, data) {
        return this.updateRecord('EngineOil', id, data, 'Моторное масло', ['modelEngineOil', 'garage']);
    }

    async deleteEngineOil(id) {
        const isUsed = await this.checkEngineOilRelatedRecords(id);
        return this.deleteRecord('EngineOil', id, 'Моторное масло', isUsed);
    }

    async deleteManyEngineOils(ids) {
        return this.deleteManyRecords('EngineOil', ids, 'Моторное масло');
    }

    async isEngineOilInUse(EngineOilId) {
        const EngineOilOnDisk = await prisma.EngineOilOnDisk.findFirst({
            where: {
                EngineOil_id: parseInt(EngineOilId),
                status: 'IN_USE', // Проверяем только активные записи
            },
        });
        return !!EngineOilOnDisk; // Возвращает true, если Моторное масло используется
    }

    async EngineOilWriteOff(data) {
        const isInUse = await this.isEngineOilInUse(data.EngineOil_id);
        if (isInUse) {
            throw new Error('Моторное масло используется и не может быть списана');
        }
        console.log(isInUse)
        return this.createRecord('EngineOilWriteOff', data, 'Моторное масло', ['EngineOil'])
    }


}

export default new EngineOilsService();