import Schemas from '../../../validations/engineer/Car/index.js';
import BaseController from '../utils/baseController.js';
import CarService from './carService.js';

class CarController extends BaseController {
    // Бренд машин
    async createBrandCar(req, res) {
        await super.createRecord(
            req, res,
            (data) => CarService.createBrandCar(data.name),
            'Бренд машин',
            Schemas.createBrandCarSchema
        );
    }

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

    async updateBrandCar(req, res) {
        await super.updateRecord(
            req, res,
            (id, data) => CarService.updateBrandCar(id, data.name),
            'Бренд машин',
            Schemas.updateBrandCar
        );
    }

    async deleteBrandCar(req, res) {
        const { id } = req.params;
        await super.deleteRecord(
            req, res,
            () => CarService.deleteBrandCar(id),
            'Бренд машин'
        );
    }

    async deleteManyBrandCars(req, res) {
        const { ids } = req.body;
        await super.deleteManyRecords(
            req, res,
            () => CarService.deleteManyBrandCars(ids),
            'Бренды машин'
        );
    }

    // Модель машин
    async createModelCar(req, res) {
        await super.createRecord(
            req, res,
            (data) => CarService.createModelCar(data),
            'модель машин',
            Schemas.createModelCar
        );
    }

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

    async updateModelCar(req, res) {
        const { id } = req.params;
        const data = req.body;
        await super.updateRecord(
            req, res,
            () => CarService.updateModelCar(id, data),
            'модель машин',
            Schemas.updateModelCar
        )
    }

    async deleteModelCar(req, res) {
        const { id } = req.params;
        await super.deleteRecord(
            req, res,
            () => CarService.deleteModelCar(id),
            'Модель машин'
        );
    }

    async deleteManyModelCars(req, res) {
        const { ids } = req.body;
        await super.deleteManyRecords(
            req, res,
            () => CarService.deleteManyModelCars(ids),
            'Модели машин'
        );
    }

    // Тип машины
    async createTypeCar(req, res) {
        await super.createRecord(
            req, res,
            (data) => CarService.createTypeCar(data),
            'Тип машины',
            Schemas.createTypeCar
        );
    }

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

    async updateTypeCar(req, res) {
        const { id } = req.params;
        const data = req.body;
        await super.updateRecord(
            req, res,
            () => CarService.updateTypeCar(id, data),
            'Тип машины',
            Schemas.updateTypeCar
        );
    }

    // ПОДУМАЙ НА УДАЛЕНИЕМ

    // Машина
    async createCar(req, res) {
        const { horse_power, kilowatt_hour, ...otherData } = req.body;

        let calculatedHorsePower, calculatedKilowattHour;
        
        if(horse_power && kilowatt_hour) {
            calculatedHorsePower = horse_power;
            calculatedKilowattHour = kilowatt_hour;
        } else if (horse_power) {
            calculatedHorsePower = horse_power;
            calculatedKilowattHour = horse_power * 0.7355;
        } else if (kilowatt_hour) {
            calculatedHorsePower = kilowatt_hour / 0.7355;
            calculatedKilowattHour = kilowatt_hour;
        } else {
            return res.status(400).json({ message: 'Необходимо передать лошадиные силы или килова часы' });
        }

        const data = {
            ...otherData,
            horse_power: calculatedHorsePower,
            kilowatt_hour: calculatedKilowattHour,
        };

        await super.createRecord(
            req, res,
            () => CarService.createCar(data),
            'машина',
            Schemas.createCar
        );
    }

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

    async updateCar(req, res) {
        const { id } = req.params;
        const { horse_power, kilowatt_hour, ...otherData } = req.body;

        let calculatedHorsePower, calculatedKilowattHour;
        
        if(horse_power && kilowatt_hour) {
            calculatedHorsePower = horse_power;
            calculatedKilowattHour = kilowatt_hour;
        } else if (horse_power) {
            calculatedHorsePower = horse_power;
            calculatedKilowattHour = horse_power * 0.7355;
        } else if (kilowatt_hour) {
            calculatedHorsePower = kilowatt_hour / 0.7355;
            calculatedKilowattHour = kilowatt_hour;
        } else {
            return res.status(400).json({ message: 'Необходимо передать лошадиные силы или килова часы' });
        }

        const data = {
            ...otherData,
            horse_power: calculatedHorsePower,
            kilowatt_hour: calculatedKilowattHour,
        };

        await super.updateRecord(
            req, res,
            () => CarService.updateCar(id, data),
            'машина',
            Schemas.updateCar
        );
    }


}

export default new CarController();