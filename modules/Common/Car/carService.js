import BaseService from "../../utils/baseService.js";
import prisma from "../../../prisma/prismaClient.js";
import TOService from "../TO/toService.js";

class CarService extends BaseService {
    // Бренд машины


    async getAllBrandCar() {
        return super.getAllRecords('brandCar');
    }

    async getBrandCarById(id) {
        return this.getRecordById('brandCar', id, 'Бренд машины');
    }

    // Подумай надо ли удаление

    // Моедль машины


    async getAllModelCar() {
        return super.getAllRecords('modelCar');
    }

    async getModelCarById(id) {
        return this.getRecordById('modelCar', id, 'модель машины');
    }

    // Подумай над удалением

    // Тип машины

    async getAllTypeCar() {
        return super.getAllRecords('typeCar');
    }

    async getTypeCarById(id) {
        return this.getRecordById('typeCar', id, 'тип машины');
    }

    // Подумай над удалением

    // Создание машины

    async getAllCars() {
        return super.getAllRecords('car');
    }

    async getCarById(id) {
        return this.getRecordById('car', id, 'машина');
    }


    // Подумай над списанием машины

    
}

export default new CarService();