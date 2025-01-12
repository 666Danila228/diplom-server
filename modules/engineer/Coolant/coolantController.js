import BaseController from '../utils/baseController.js';
import CoolantsService from './coolantService.js';
// import Schemas from '../../../validations/engineer/Coolant/index.js';

class CoolantController extends BaseController {
    // Бренд тасола
    async createBrandCoolant(req, res) {
        await super.createRecord(
            req, res,
            (data) => CoolantsService.createBrandCoolant(data.name),
            'Бренд тасола',
            Schemas.createBrandCoolantSchema
        );
    }

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

    async updateBrandCoolant(req, res) {
        await super.updateRecord(
            req, res,
            (id, data) => CoolantsService.updateBrandCoolant(id, data.name),
            'Бренд тасола',
            Schemas.updateBrandCoolant
        );
    }

    async deleteBrandCoolant(req, res) {
        const { id } = req.params;
        await super.deleteRecord(
            req, res,
            () => CoolantsService.deleteBrandCoolant(id),
            'Бренд тасола'
        );
    }

    async deleteManyBrandCoolants(req, res) {
        const { ids } = req.body;
        await super.deleteManyRecords(
            req, res,
            () => CoolantsService.deleteManyBrandCoolants(ids),
            'Бренды тасола'
        );
    }

    // Модель тасола
    async createModelCoolant(req, res) {
        await super.createRecord(
            req, res,
            (data) => CoolantsService.createModelCoolant(data),
            'модель тасола',
            Schemas.createModelCoolant
        );
    }

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

    async updateModelCoolant(req, res) {
        await super.updateRecord(
            req, res,
            (id, data) => CoolantsService.updateModelCoolant(id, data),
            'модель тасола',
            Schemas.updateModelCoolant
        )
    }

    async deleteModelCoolant(req, res) {
        const { id } = req.params;
        await super.deleteRecord(
            req, res,
            () => CoolantsService.deleteModelCoolant(id),
            'Модель тасола'
        );
    }

    async deleteManyModelCoolants(req, res) {
        const { ids } = req.body;
        await super.deleteManyRecords(
            req, res,
            () => CoolantsService.deleteManyModelCoolants(ids),
            'Модели тасола'
        );
    }

    // тасолаа
    async createCoolant(req, res) {
        await super.createRecord(
            req, res,
            (data) => CoolantsService.createCoolant(data),
            'тасолаа',
            Schemas.createCoolant
        )
    }

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

    async updateCoolant(req, res) {
        await super.updateRecord(
            req, res,
            (id, data) => CoolantsService.updateCoolant(id, data),
            'тасолаа',
            Schemas.updateCoolant
        )
    }

    async deleteCoolant(req, res) {
        const { id } = req.params;
        await super.deleteRecord(
            req, res,
            () => CoolantsService.deleteCoolant(id),
            'тасолаа'
        );
    }

    async deleteManyCoolants(req, res) {
        const { ids } = req.body;
        await super.deleteManyRecords(
            req, res,
            () => CoolantsService.deleteManyCoolants(ids),
            'тасола'
        );
    }

    async CoolantWriteOff(req, res) {
        await super.createRecord(
            req, res, 
            (data) => CoolantsService.CoolantWriteOff(data),
            'тасолаа'
        )
    }
}

export default new CoolantController();