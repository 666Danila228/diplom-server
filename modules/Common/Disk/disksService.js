import BaseService from '../../utils/baseService.js';
import prisma from '../../../prisma/prismaClient.js';

class DiskService extends BaseService {

    async getAllBrandDisk(options = {}) {
        return super.getAllRecords('brandDisk', options);
    }

    async getBrandDiskById(id) {
        return this.getRecordById('brandDisk', id, 'Бренд дисков');
    }

    // Модели дисков
    
    async getAllModelDisks(options = {}) {
        return super.getAllRecords('modelDisk', options);
    }

    async getModelDiskById(id) {
        return this.getRecordById('modelDisk', id, 'модель шин');
    }

    // Диск

    async getAllDisks(options = {}) {
        return super.getAllRecords('Disk', options);
    }

    async getDiskById(id) {
        return this.getRecordById('Disk', id, 'шина');
    }
}

export default new DiskService();