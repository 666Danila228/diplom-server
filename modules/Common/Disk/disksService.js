import BaseService from '../../utils/baseService.js';
import prisma from '../../../prisma/prismaClient.js';

class DiskService extends BaseService {

    async getAllBrandDisk() {
        return super.getAllRecords('brandDisk');
    }

    async getBrandDiskById(id) {
        return this.getRecordById('brandDisk', id, 'Бренд дисков');
    }

    // Модели дисков
    
    async getAllModelDisks() {
        return super.getAllRecords('modelDisk');
    }

    async getModelDiskById(id) {
        return this.getRecordById('modelDisk', id, 'модель шин');
    }

    // Диск

    async getAllDisks() {
        return super.getAllRecords('Disk');
    }

    async getDiskById(id) {
        return this.getRecordById('Disk', id, 'шина');
    }
}

export default new DiskService();