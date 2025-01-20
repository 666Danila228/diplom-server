import BaseService from "../../utils/baseService";
import prisma from "../../../prisma/prismaClient";

class GarageService extends BaseService {
    async getAllGarages(options = {}) {
        return super.getAllRecords('garage', options);
    }

    async getGarageById(id) {
        return this.getRecordById('garage', id, 'Гараж', )
    }
}