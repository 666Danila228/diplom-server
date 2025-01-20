import BaseController from '../../utils/baseController.js';
import EngineOilsService from './engineOilService.js';
import Schemas from '../../../validations/engineer/EngineOil/index.js';

class EngineOilController extends BaseController {
    // Бренд Моторных масел
    async createBrandEngineOil(req, res) {
        await super.createRecord(
            req, res,
            (data) => EngineOilsService.createBrandEngineOil(data.name),
            'Бренд Моторное масло',
            Schemas.createBrandEngineOilSchema
        );
    }


    async updateBrandEngineOil(req, res) {
        await super.updateRecord(
            req, res,
            (id, data) => EngineOilsService.updateBrandEngineOil(id, data.name),
            'Бренд Моторное масло',
            Schemas.updateBrandEngineOil
        );
    }

    async deleteBrandEngineOil(req, res) {
        const { id } = req.params;
        await super.deleteRecord(
            req, res,
            () => EngineOilsService.deleteBrandEngineOil(id),
            'Бренд Моторных масел'
        );
    }

    async deleteManyBrandEngineOils(req, res) {
        const { ids } = req.body;
        await super.deleteManyRecords(
            req, res,
            () => EngineOilsService.deleteManyBrandEngineOils(ids),
            'Бренды Моторных масел'
        );
    }

    // Модель Моторных масел
    async createModelEngineOil(req, res) {
        await super.createRecord(
            req, res,
            (data) => EngineOilsService.createModelEngineOil(data),
            'модель Моторных масел',
            Schemas.createModelEngineOil
        );
    }

    async updateModelEngineOil(req, res) {
        await super.updateRecord(
            req, res,
            (id, data) => EngineOilsService.updateModelEngineOil(id, data),
            'модель Моторных масел',
            Schemas.updateModelEngineOil
        )
    }

    async deleteModelEngineOil(req, res) {
        const { id } = req.params;
        await super.deleteRecord(
            req, res,
            () => EngineOilsService.deleteModelEngineOil(id),
            'Модель Моторных масел'
        );
    }

    async deleteManyModelEngineOils(req, res) {
        const { ids } = req.body;
        await super.deleteManyRecords(
            req, res,
            () => EngineOilsService.deleteManyModelEngineOils(ids),
            'Модели Моторных масел'
        );
    }

    // Моторных масела
    async createEngineOil(req, res) {
        await super.createRecord(
            req, res,
            (data) => EngineOilsService.createEngineOil(data),
            'Моторных масела',
            Schemas.createEngineOil
        )
    }


    async updateEngineOil(req, res) {
        await super.updateRecord(
            req, res,
            (id, data) => EngineOilsService.updateEngineOil(id, data),
            'Моторных масела',
            Schemas.updateEngineOil
        )
    }

    async deleteEngineOil(req, res) {
        const { id } = req.params;
        await super.deleteRecord(
            req, res,
            () => EngineOilsService.deleteEngineOil(id),
            'Моторных масела'
        );
    }

    async deleteManyEngineOils(req, res) {
        const { ids } = req.body;
        await super.deleteManyRecords(
            req, res,
            () => EngineOilsService.deleteManyEngineOils(ids),
            'Моторное масло'
        );
    }

    async EngineOilWriteOff(req, res) {
        await super.createRecord(
            req, res, 
            (data) => EngineOilsService.EngineOilWriteOff(data),
            'Моторных масела'
        )
    }
}

export default new EngineOilController();