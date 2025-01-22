import BaseService from '../../utils/baseService.js';
import prisma from '../../../prisma/prismaClient.js';

class TiresService extends BaseService {

    // Бренд шин

    async getAllBrandTires(options = {}) {
        return super.getAllRecords('brandTire', options);
    }

    async getBrandTireById(id) {
        return this.getRecordById('brandTire', id, 'Бренд шин');
    }

    // Модели шин
    async getAllModelTires(options = {}) {
        return super.getAllRecords('modelTire', options);
    }

    async getModelTireById(id) {
        return this.getRecordById('modelTire', id, 'модель шин');
    }

    // Шина
    async getAllTires(options = {}) {
        return super.getAllRecords('tire', options);
    }

    async getTireById(id) {
        return this.getRecordById('tire', id, 'шина');
    }

}

export default new TiresService();