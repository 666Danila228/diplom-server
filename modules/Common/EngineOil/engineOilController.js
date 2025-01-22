import BaseController from '../../utils/baseController.js';
import EngineOilsService from './engineOilService.js';
import Schemas from '../../../validations/engineer/EngineOil/index.js';

class EngineOilController extends BaseController {
    // Бренд Моторных масел

    async getAllBrandEngineOils(req, res) {
        await super.getAllRecords(req, res, EngineOilsService.getAllBrandEngineOils, 'брендов Моторных масел');
    }

    async getBrandEngineOilById(req, res) {
        await super.getRecordById(
            req, res,
            (id) => EngineOilsService.getBrandEngineOilById(id),
            'Бренд Моторных масел'
        );
    }


    // Модель Моторных масел

    async getAllModelEngineOils(req, res) {
        await super.getAllRecords(req, res, EngineOilsService.getAllModelEngineOils, 'моделей Моторных масел');
    }

    async getModelEngineOilById(req, res) {
        await super.getRecordById(
            req, res,
            (id) => EngineOilsService.getModelEngineOilById(id),
            'модель Моторных масел'
        );
    }



    // Моторных масела

    async getAllEngineOils(req, res) {
        const { where, orderBy, include, skip, take } = req.query;

        const options = {
            where: where ? JSON.parse(where) : undefined,
            orderBy: orderBy ? JSON.parse(orderBy) : undefined,
            include: include ? JSON.parse(include) : undefined,
            skip: skip ? parseInt(skip) : undefined,
            take: take ? parseInt(take) : undefined,
        };

        console.log('Options:', options);

        await super.getAllRecords(req, res, () => EngineOilsService.getAllEngineOils(options), 'Моторное масло');
    }

    async getEngineOilByid(req, res) {
        await super.getRecordById(
            req, res,
            (id) => EngineOilsService.getEngineOilById(id),
            'Моторных масела'
        )
    }

}

export default new EngineOilController();