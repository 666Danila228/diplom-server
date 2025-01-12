import BaseController from '../utils/baseController.js';
import DiskService from './disksService.js'; 
import Schemas from '../../../validations/engineer/Disk/index.js';

class DiskController extends BaseController {
    // Бренд шин
    async createBrandDisk(req, res) {
        await super.createRecord(
            req, res,
            (data) => DiskService.createBrandDisk(data.name),
            'Бренд шины',
            Schemas.createBrandDisk
        );
    }

    async getAllBrandDisks(req, res) {
        await super.getAllRecords(req, res, DiskService.getAllBrandDisk, 'брендов шин');
    }

    async getBrandDiskById(req, res) {
        await super.getRecordById(
            req, res,
            (id) => DiskService.getBrandDiskById(id),
            'Бренд шин'
        );
    }

    async updateBrandDisk(req, res) {
        await super.updateRecord(
            req, res,
            (id, data) => DiskService.updateBrandDisk(id, data.name),
            'Бренд шины',
            Schemas.updateBrandDisk
        );
    }

    async deleteBrandDisk(req, res) {
        const { id } = req.params;
        await super.deleteRecord(
            req, res,
            () => DiskService.deleteBrandDisk(id),
            'Бренд шин'
        );
    }

    async deleteManyBrandDisks(req, res) {
        const { ids } = req.body;
        await super.deleteManyRecords(
            req, res,
            () => DiskService.deleteManyBrandDisks(ids),
            'Бренды шин'
        );
    }

    // Модель шин
    async createModelDisk(req, res) {
        await super.createRecord(
            req, res,
            (data) => DiskService.createModelDisk(data),
            'модель шин',
            Schemas.createModelDisk
        );
    }

    async getAllModelDisks(req, res) {
        await super.getAllRecords(req, res, DiskService.getAllModelDisks, 'моделей шин');
    }

    async getModelDiskById(req, res) {
        await super.getRecordById(
            req, res,
            (id) => DiskService.getModelDiskById(id),
            'модель шин'
        );
    }

    async updateModelDisk(req, res) {
        await super.updateRecord(
            req, res,
            (id, data) => DiskService.updateModelDisk(id, data),
            'модель шин',
            Schemas.updateModelDisk
        )
    }

    async deleteModelDisk(req, res) {
        const { id } = req.params;
        await super.deleteRecord(
            req, res,
            () => DiskService.deleteModelDisk(id),
            'Модель шин'
        );
    }

    async deleteManyModelDisks(req, res) {
        const { ids } = req.body;
        await super.deleteManyRecords(
            req, res,
            () => DiskService.deleteManyModelDisks(ids),
            'Модели шин'
        );
    }

    // Шина
    async createDisk(req, res) {
        await super.createRecord(
            req, res,
            (data) => DiskService.createDisk(data),
            'шина',
            Schemas.createDisk
        )
    }

    async getAllDisks(req, res) {
        await super.getAllRecords(req, res, DiskService.getAllDisks, 'дисков');
    }

    async getDiskByid(req, res) {
        await super.getRecordById(
            req, res,
            (id) => DiskService.getDiskById(id),
            'шина'
        )
    }

    async updateDisk(req, res) {
        await super.updateRecord(
            req, res,
            (id, data) => DiskService.updateDisk(id, data),
            'шина',
            Schemas.updateDisk
        )
    }

    async deleteDisk(req, res) {
        const { id } = req.params;
        await super.deleteRecord(
            req, res,
            () => DiskService.deleteDisk(id),
            'Шина'
        );
    }

    async deleteManyDisks(req, res) {
        const { ids } = req.body;
        await super.deleteManyRecords(
            req, res,
            () => DiskService.deleteManyDisks(ids),
            'Шины'
        );
    }

    async DiskWriteOff(req, res) {
        await super.createRecord(
            req, res, 
            (data) => DiskService.DiskWriteOff(data),
            'шина'
        )
    }
}

export default new DiskController();