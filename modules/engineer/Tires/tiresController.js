import BaseController from '../utils/baseController.js';
import TiresService from './tiresService.js';
import Schemas from '../../../validations/engineer/Tire/index.js';

class TireController extends BaseController {
    // Бренд шин
    async createBrandTire(req, res) {
        await super.createRecord(
            req, res,
            (data) => TiresService.createBrandTire(data.name),
            'Бренд шины',
            Schemas.createBrandTireSchema
        );
    }

    async getAllBrandTires(req, res) {
        await super.getAllRecords(req, res, TiresService.getAllBrandTires, 'брендов шин');
    }

    async getBrandTireById(req, res) {
        await super.getRecordById(
            req, res,
            (id) => TiresService.getBrandTireById(id),
            'Бренд шин'
        );
    }

    async updateBrandTire(req, res) {
        await super.updateRecord(
            req, res,
            (id, data) => TiresService.updateBrandTire(id, data.name),
            'Бренд шины',
            Schemas.updateBrandTire
        );
    }

    async deleteBrandTire(req, res) {
        const { id } = req.params;
        await super.deleteRecord(
            req, res,
            () => TiresService.deleteBrandTire(id),
            'Бренд шин'
        );
    }

    async deleteManyBrandTires(req, res) {
        const { ids } = req.body;
        await super.deleteManyRecords(
            req, res,
            () => TiresService.deleteManyBrandTires(ids),
            'Бренды шин'
        );
    }

    // Модель шин
    async createModelTire(req, res) {
        await super.createRecord(
            req, res,
            (data) => TiresService.createModelTire(data),
            'модель шин',
            Schemas.createModelTire
        );
    }

    async getAllModelTires(req, res) {
        await super.getAllRecords(req, res, TiresService.getAllModelTires, 'моделей шин');
    }

    async getModelTireById(req, res) {
        await super.getRecordById(
            req, res,
            (id) => TiresService.getModelTireById(id),
            'модель шин'
        );
    }

    async updateModelTire(req, res) {
        await super.updateRecord(
            req, res,
            (id, data) => TiresService.updateModelTire(id, data),
            'модель шин',
            Schemas.updateModelTire
        )
    }

    async deleteModelTire(req, res) {
        const { id } = req.params;
        await super.deleteRecord(
            req, res,
            () => TiresService.deleteModelTire(id),
            'Модель шин'
        );
    }

    async deleteManyModelTires(req, res) {
        const { ids } = req.body;
        await super.deleteManyRecords(
            req, res,
            () => TiresService.deleteManyModelTires(ids),
            'Модели шин'
        );
    }

    // Шина
    async createTire(req, res) {
        await super.createRecord(
            req, res,
            (data) => TiresService.createTire(data),
            'шина',
            Schemas.createTire
        )
    }

    async getAllTires(req, res) {
        await super.getAllRecords(req, res, TiresService.getAllTires, 'шины');
    }

    async getTireByid(req, res) {
        await super.getRecordById(
            req, res,
            (id) => TiresService.getTireById(id),
            'шина'
        )
    }

    async updateTire(req, res) {
        await super.updateRecord(
            req, res,
            (id, data) => TiresService.updateTire(id, data),
            'шина',
            Schemas.updateTire
        )
    }

    async deleteTire(req, res) {
        const { id } = req.params;
        await super.deleteRecord(
            req, res,
            () => TiresService.deleteTire(id),
            'Шина'
        );
    }

    async deleteManyTires(req, res) {
        const { ids } = req.body;
        await super.deleteManyRecords(
            req, res,
            () => TiresService.deleteManyTires(ids),
            'Шины'
        );
    }
}

export default new TireController();