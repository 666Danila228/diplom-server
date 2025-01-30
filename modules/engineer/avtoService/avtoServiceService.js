import BaseService from "../../utils/baseService.js";
import prisma from "../../../prisma/prismaClient.js";

class AvtoServiceService extends BaseService {
    async createAvtoService(data) {
        return this.createRecord('service', data, 'Автосервис');
    }

    async updateAvtoService(id, data) {
        return this.updateRecord('service', id, data, 'Автосервис')
    }
}

export default new AvtoServiceService();