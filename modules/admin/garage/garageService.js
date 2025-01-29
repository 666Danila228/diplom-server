import BaseService from "../../utils/baseService.js";
import prisma from "../../../prisma/prismaClient.js";

class GarageService extends BaseService {
    async createGarage(data) {
        return this.createRecord('garage', data, 'Гараж');
    }

    async updateGarage(id, data) {
        return this.updateRecord('Garage', id, data, 'Гараж')
    }
}

export default new GarageService();