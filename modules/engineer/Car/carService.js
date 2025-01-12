import BaseService from "../utils/baseService.js";
import prisma from "../../../prisma/prismaClient.js";

class CarService extends BaseService {
    // Бренд машины

    async createBrandCar(name) {
        return this.createRecord('brandCar', { name }, 'бренд машины');
    }

    async getAllBrandCar() {
        return super.getAllRecords('brandCar');
    }

    async getBrandCarById(id) {
        return this.getRecordById('brandCar', id, 'Бренд машины');
    }

    async updateBrandCar(id, name) {
        return this.updateRecord('brandCar', id, { name }, 'Бренд машины');
    }

    // Подумай надо ли удаление

    // Моедль машины

    async createModelCar(data) {
        return this.createRecord('modelCar', data, 'Модель машины', ['brandCar']);
    }

    async getAllModelCar() {
        return super.getAllRecords('modelCar');
    }

    async getModelCarById(id) {
        return this.getRecordById('modelCar', id, 'модель машины');
    }

    async updateModelCar(id, data) {
        return this.updateRecord('modelCar', id, data, 'Модель машины', ['brandCar']);
    }

    // Подумай над удалением

    // Тип машины

    async createTypeCar(data) {
        return this.createRecord('typeCar', data, 'тип машины');
    }

    async getAllTypeCar() {
        return super.getAllRecords('typeCar');
    }

    async getTypeCarById(id) {
        return this.getRecordById('typeCar', id, 'тип машины');
    }

    async updateTypeCar(id, data) {
        return this.updateRecord('typeCar', id, data, 'тип машины');
    }

    // Подумай над удалением

    // Создание машины

    async createCar(data) {
        return this.createRecord('car', data, 'машина', ['service', 'Garage', 'TypeCar', 'ModelCar', 'DrivingCategory']);
    }

    async getAllCars() {
        return super.getAllRecords('car');
    }

    async getCarById(id) {
        return this.getRecordById('car', id, 'машина');
    }

    async updateCar(id, data) {
        return this.updateRecord('car', id, data, 'Машина', ['service', 'Garage', 'TypeCar', 'ModelCar', 'DrivingCategory']);
    }

    // Подумай над списанием машины

    
}

export default new CarService();