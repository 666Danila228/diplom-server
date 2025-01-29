import BaseController from '../../utils/baseController.js';
import DiskService from './disksService.js'; 
import Schemas from '../../../validations/engineer/Disk/index.js';

class DiskController extends BaseController {
    // Бренд шин

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

    // Модель шин

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

    // Шина

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

}

export default new DiskController();