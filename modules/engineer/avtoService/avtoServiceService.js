import BaseService from "../utils/baseService.js";
import prisma from "../../../prisma/prismaClient.js";

class AvtoServiceService extends BaseService {
    async createAvtoService(data) {
        return this.createRecord('service', data, 'Автосервис');
    }

    async getAllAvtoService() {
        return super.getAllRecords('service', 'Автосервисы');
    }

    async getAvtoServiceById(id) {
        return this.getRecordById('service', id, 'Автосервис')
    }

    async updateAvtoService(id, data) {
        return this.updateRecord('service', id, data, 'Автосервис')
    }
}

export default new AvtoServiceService();