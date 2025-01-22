import BaseController from '../../utils/baseController.js';
import TiresService from './tiresService.js';
import Schemas from '../../../validations/engineer/Tire/index.js';

class TireController extends BaseController {
    // Бренд шин
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

    // Модель шин
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

    // Шина
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
}

export default new TireController();