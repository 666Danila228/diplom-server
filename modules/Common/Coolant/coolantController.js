import BaseController from '../../utils/baseController.js';
import CoolantsService from './coolantService.js';
import Schemas from '../../../validations/engineer/Coolant/index.js';

class CoolantController extends BaseController {
    // Бренд тасола
    async getAllBrandCoolants(req, res) {
        await super.getAllRecords(req, res, CoolantsService.getAllBrandCoolants, 'брендов тасола');
    }

    async getBrandCoolantById(req, res) {
        await super.getRecordById(
            req, res,
            (id) => CoolantsService.getBrandCoolantById(id),
            'Бренд тасола'
        );
    }

    // Модель тасола
    async getAllModelCoolants(req, res) {
        await super.getAllRecords(req, res, CoolantsService.getAllModelCoolants, 'моделей тасола');
    }

    async getModelCoolantById(req, res) {
        await super.getRecordById(
            req, res,
            (id) => CoolantsService.getModelCoolantById(id),
            'модель тасола'
        );
    }

    // тасолаа
    async getAllCoolants(req, res) {
        await super.getAllRecords(req, res, CoolantsService.getAllCoolants, 'тасола');
    }

    async getCoolantByid(req, res) {
        await super.getRecordById(
            req, res,
            (id) => CoolantsService.getCoolantById(id),
            'тасолаа'
        )
    }
}

export default new CoolantController();