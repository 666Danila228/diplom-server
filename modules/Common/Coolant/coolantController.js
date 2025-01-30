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
        try {
            const { where, orderBy, include, skip, take } = req.query;
    
            const options = {
                where: where ? JSON.parse(where) : undefined,
                orderBy: orderBy ? JSON.parse(orderBy) : undefined,
                include: include ? JSON.parse(include) : undefined,
                skip: skip ? parseInt(skip) : undefined,
                take: take ? parseInt(take) : undefined,
            };
    
            console.log('Options:', options);
    
            const coolants = await CoolantsService.getAllCoolants(options);
            res.status(200).json({ message: "Список Тосолов", records: coolants });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Ошибка при получении списка тосолов", error: error.message });
        }
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