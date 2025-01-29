import BaseService from "../../utils/baseService.js";
import prisma from "../../../prisma/prismaClient.js";

class WheelService extends BaseService {

    async getAllWheels(options = {}) {
        return this.getAllRecords('tireOnDisk', options);
    }

    async getWheelById(id) {
        return this.getRecordById('tireOnDisk', id, )
    }
 }

 export default new WheelService();