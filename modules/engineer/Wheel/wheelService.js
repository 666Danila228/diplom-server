import BaseService from "../../utils/baseService.js";
import prisma from "../../../prisma/prismaClient.js";

class WheelService extends BaseService {
    async createWheel(data) {
        const { tire_id, disk_id } = data;

        const [tire, disk] = await Promise.all([
            prisma.tire.findUnique({where: { id: tire_id }}),
            prisma.disk.findUnique({where: { id: disk_id }}),
        ]);

        if (!tire || !disk) {
            throw new Error('Шина или диск не найдены');
        }

        if(tire.status !== 'IN_STOCK' || disk.status !== 'IN_STOCK') {
            throw new Error('Шина или диск уже используются');
        }

        return prisma.$transaction(async (prisma) => {
            const wheel = await this.createRecord('tireOnDisk', data, 'колесо', ['tire', 'disk']);

            await this.updateRecord('tire', tire_id, { status: 'IN_USE' }, 'шина');

            await this.updateRecord('disk', disk_id, { status: 'IN_USE' }, 'диск');

            return wheel;
        });
    }
 }

 export default new WheelService();