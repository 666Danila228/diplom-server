import BaseService from '../../utils/baseService.js';
import prisma from '../../../prisma/prismaClient.js';

class DiskService extends BaseService {
    // Проверка связанных записей для BrandDisk
    async checkBrandDiskRelatedRecords(id) {
        const modelDiskCount = await prisma.modelDisk.count({
            where: { brand_id: parseInt(id) },
        });
        return modelDiskCount > 0;
    }

    // Проверка связанных записей для ModelDisk
    async checkModelDiskRelatedRecords(id) {
        const DiskCount = await prisma.Disk.count({
            where: { model_id: parseInt(id) },
        });
        return DiskCount > 0;
    }

    // Проверка связанных записей для Disk
    async checkDiskRelatedRecords(id) {
        const DiskHistoryCount = await prisma.DiskHistory.count({
            where: { Disk_id: parseInt(id) },
        });
        return DiskHistoryCount > 0;
    }

    // Переопределение метода isRecordUsed для конкретных моделей
    async isRecordUsed(model, id) {
        switch (model) {
            case 'brandDisk':
                return this.checkBrandDiskRelatedRecords(id);
            case 'modelDisk':
                return this.checkModelDiskRelatedRecords(id);
            case 'Disk':
                return this.checkDiskRelatedRecords(id);
            default:
                throw new Error(`Метод isRecordUsed не реализован для модели ${model}`);
        }
    }

    async createBrandDisk(name) {
        return this.createRecord('brandDisk', { name }, 'бренд диска');
    }

    async updateBrandDisk(id, name) {
        return this.updateRecord('brandDisk', id, { name }, 'Бренд диска');
    }

    async deleteBrandDisk(id) {
        const isUsed = await this.checkBrandDiskRelatedRecords(id);
        return this.deleteRecord('brandDisk', id, 'Бренд диска', isUsed);
    }

    async deleteManyBrandDisk(ids) {
        return this.deleteManyRecords('brandDisk', ids, 'Бренды дисков')
    }


    // Модели дисков
    async createModelDisk(data) {
        return this.createRecord('modelDisk', data, 'модель дисков', ['BrandDisk']);
    }

    async updateModelDisk(id, data) {
        return this.updateRecord('modelDisk', id, data, 'модель шин', ['BrandDisk']);
    }

    async deleteModelDisk(id) {
        const isUsed = await this.checkModelDiskRelatedRecords(id);
        return this.deleteRecord('modelDisk', id, 'Модель шин', isUsed);
    }

    async deleteManyModelDisks(ids) {
        return this.deleteManyRecords('modelDisk', ids, 'Модели шин');
    }

    // Диск

    async createDisk(data) {
        return this.createRecord('Disk', data, 'шина', ['modelDisk', 'garage']);
    }

    async updateDisk(id, data) {
        return this.updateRecord('Disk', id, data, 'шина', ['modelDisk', 'garage']);
    }

    async deleteDisk(id) {
        const isUsed = await this.checkDiskRelatedRecords(id);
        return this.deleteRecord('Disk', id, 'Шина', isUsed);
    }

    async deleteManyDisks(ids) {
        return this.deleteManyRecords('Disk', ids, 'Шины');
    }

    async isDiskInUse(DiskId) {
        const DiskOnDisk = await prisma.DiskOnDisk.findFirst({
            where: {
                Disk_id: parseInt(DiskId),
                status: 'IN_USE', 
            },
        });
        return !!DiskOnDisk;
    }

    async DiskWriteOff(data) {
        const isInUse = await this.isDiskInUse(data.Disk_id);
        if (isInUse) {
            throw new Error('Шина используется и не может быть списана');
        }
        console.log(isInUse)
        return this.createRecord('DiskWriteOff', data, 'шина', ['Disk'])
    }
}

export default new DiskService();