import BaseController from '../../utils/baseController.js';
import TiresService from './tiresService.js';
import Schemas from '../../../validations/engineer/Tire/index.js';

class TireController extends BaseController {
    // Бренд шин
    async createBrandTire(req, res) {
        const { name } = req.body;
        await super.createRecord(
            req, res,
            () => TiresService.createBrandTire(name),
            'Бренд шины',
            Schemas.createBrandTireSchema
        );
    }

    async getAllBrandTires(req, res) {
        const { where, orderBy, include, skip, take } = req.query;

        const options = {
            where: where ? JSON.parse(where) : undefined,
            orderBy: orderBy ? JSON.parse(orderBy) : undefined,
            include: include ? JSON.parse(include) : undefined,
            skip: skip ? parseInt(skip) : undefined,
            take: take ? parseInt(take) : undefined,
        };

        await super.getAllRecords(
            req, res,
            () => TiresService.getAllBrandTires(options),
            'брендов шин'
        );
    }

    async getBrandTireById(req, res) {
        const { id } = req.params;
        await super.getRecordById(
            req, res,
            () => TiresService.getBrandTireById(id),
            'Бренд шин'
        );
    }

    async updateBrandTire(req, res) {
        const { id } = req.params;
        const { name } = req.body;
        await super.updateRecord(
            req, res,
            () => TiresService.updateBrandTire(id, name),
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
        const data = req.body;
        await super.createRecord(
            req, res,
            () => TiresService.createModelTire(data),
            'модель шин',
            Schemas.createModelTire
        );
    }

    async getAllModelTires(req, res) {
        const { where, orderBy, include, skip, take } = req.query;
    
        const options = {
            where: where ? JSON.parse(where) : undefined,
            orderBy: orderBy ? JSON.parse(orderBy) : undefined,
            include: include ? JSON.parse(include) : undefined,
            skip: skip ? parseInt(skip) : undefined,
            take: take ? parseInt(take) : undefined,
        };
    
        await super.getAllRecords(
            req, res,
            () => TiresService.getAllModelTires(options), // Передаем функцию, а не результат
            'моделей шин'
        );
    }

    async getModelTireById(req, res) {
        const { id } = req.params;
        await super.getRecordById(
            req, res,
            () => TiresService.getModelTireById(id),
            'модель шин'
        );
    }

    async updateModelTire(req, res) {
        const { id } = req.params;
        const data = req.body;
        await super.updateRecord(
            req, res,
            () => TiresService.updateModelTire(id, data),
            'модель шин',
            Schemas.updateModelTire
        );
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
        const data = req.body;
        await super.createRecord(
            req, res,
            () => TiresService.createTire(data),
            'шина',
            Schemas.createTire
        );
    }

    async getAllTires(req, res) {
        const { where, orderBy, include, skip, take } = req.query;
    
        const options = {
            where: where ? JSON.parse(where) : undefined,
            orderBy: orderBy ? JSON.parse(orderBy) : undefined,
            include: include ? JSON.parse(include) : undefined,
            skip: skip ? parseInt(skip) : undefined,
            take: take ? parseInt(take) : undefined,
        };
    
        await super.getAllRecords(
            req, res,
            () => TiresService.getAllTires(options), // Передаем функцию, а не результат
            'шины'
        );
    }

    async getTireById(req, res) {
        const { id } = req.params;
        await super.getRecordById(
            req, res,
            () => TiresService.getTireById(id),
            'шина'
        );
    }

    async updateTire(req, res) {
        const { id } = req.params;
        const data = req.body;
        await super.updateRecord(
            req, res,
            () => TiresService.updateTire(id, data),
            'шина',
            Schemas.updateTire
        );
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

    async tireWriteOff(req, res) {
        const data = req.body;
        await super.createRecord(
            req, res,
            () => TiresService.tireWriteOff(data),
            'шина'
        );
    }
}

export default new TireController();