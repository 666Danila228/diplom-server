import BaseService from "../../utils/baseService.js";
import prisma from "../../../prisma/prismaClient.js";
import TOService from "../TO/toService.js";

class CarService extends BaseService {
    // Бренд машины

    async createBrandCar(name) {
        return this.createRecord('brandCar', { name }, 'бренд машины');
    }

    async updateBrandCar(id, name) {
        return this.updateRecord('brandCar', id, { name }, 'Бренд машины');
    }

    // Подумай надо ли удаление

    // Моедль машины

    async createModelCar(data) {
        return this.createRecord('modelCar', data, 'Модель машины', ['brandCar']);
    }

    async updateModelCar(id, data) {
        return this.updateRecord('modelCar', id, data, 'Модель машины', ['brandCar']);
    }

    // Подумай над удалением

    // Тип машины

    async createTypeCar(data) {
        return this.createRecord('typeCar', data, 'тип машины');
    }

    async updateTypeCar(id, data) {
        return this.updateRecord('typeCar', id, data, 'тип машины');
    }

    // Подумай над удалением

    // Создание машины

    async createCar(data) {
        const car = await this.createRecord('car', data, 'машина', ['service', 'Garage', 'TypeCar', 'ModelCar', 'DrivingCategory']);
        await TOService.scheduleInitialTO(car.id, car.type_car_id);
        return car;
    }

    async updateCar(id, data) {
        return this.updateRecord('car', id, data, 'Машина', ['service', 'Garage', 'TypeCar', 'ModelCar', 'DrivingCategory']);
    }

    // Подумай над списанием машины

    
}

export default new CarService();