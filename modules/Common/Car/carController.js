import Schemas from '../../../validations/engineer/Car/index.js';
import BaseController from '../../utils/baseController.js';
import CarService from './carService.js';

class CarController extends BaseController {
    // Бренд машин

    async getAllBrandCars(req, res) {
        await super.getAllRecords(req, res, CarService.getAllBrandCar, 'брендов машин');
    }

    async getBrandCarById(req, res) {
        await super.getRecordById(
            req, res,
            (id) => CarService.getBrandCarById(id),
            'Бренд машин'
        );
    }


    // Модель машин

    async getAllModelCars(req, res) {
        await super.getAllRecords(req, res, CarService.getAllModelCar, 'моделей машин');
    }

    async getModelCarById(req, res) {
        await super.getRecordById(
            req, res,
            (id) => CarService.getModelCarById(id),
            'модель машин'
        );
    }

    // Тип машины

    async getAllTypeCar(req, res) {
        await super.getAllRecords(req, res, CarService.getAllTypeCar, 'Типы машин');
    }

    async getTypeCarById(req, res) {
        const { id } = req.params;
        await super.getRecordById(
            req, res,
            () => CarService.getTypeCarById(id),
            'Тип машины'
        )
    }

    // ПОДУМАЙ НА УДАЛЕНИЕМ

    // Машина

    async getAllCars(req, res) {
        await super.getAllRecords(req, res, CarService.getAllCars, 'Машины');
    }

    async getCarById(req, res) {
        const { id } = req.params;
        await super.getRecordById(
            req, res,
            () => CarService.getCarById(id),
            'машина'
        );
    }


}

export default new CarController();