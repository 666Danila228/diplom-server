import BaseService from "../../utils/baseService.js";
import prisma from "../../../prisma/prismaClient.js";

class WheelService extends BaseService {
    async createWheel(data) {
        return prisma.$transaction(async (prisma) => {
            const wheel = await this.createRecord('tireOnDisk', data, 'колесо', ['tire', 'disk']);

            await this.updateRecord('tire', data.tire_id, { status: 'IN_USE' }, 'шина');

            await this.updateRecord('disk', data.disk_id, { status: 'IN_USE' }, 'диск');

            return wheel;
        });
    }

    async updateWheel(id, data) {
        return prisma.$transaction(async (prisma) => {
            const currentWheel = await prisma.tireOnDisk.findUnique({
                where: { id },
                include: { tire: true, disk: true },
            });

            if (!currentWheel) {
                throw new Error('Колесо не найдено');
            }

            if (data.tire_id) {
                await this.updateRecord('tire', currentWheel.tire_id, { status: 'IN_STOCK' }, 'шина');

                await this.updateRecord('tire', data.tire_id, { status: 'IN_USE' }, 'шина');
            }

            if (data.disk_id) {
                await this.updateRecord('disk', currentWheel.disk_id, { status: 'IN_STOCK' }, 'диск');

                await this.updateRecord('disk', data.disk_id, { status: 'IN_USE' }, 'диск');
            }

            const updatedWheel = await this.updateRecord('tireOnDisk', id, data, 'колесо');

            return updatedWheel;
        });
    }
}

export default new WheelService();