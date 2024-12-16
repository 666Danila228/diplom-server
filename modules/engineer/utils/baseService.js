import prisma from "../../../prisma/prismaClient.js";
import { checkRecordExists } from "../../../utils/checkRecordExists.js";

class BaseService {
    async createRecord(model, data, entityName, relationFields = []) {
        try {
            if (data.name) {
                await checkRecordExists(entityName, model, 'name', data.name, false);
            }

            const createData = { ...data };
            relationFields.forEach((field) => {
                if (data[field]) {
                    createData[field] = {
                        connect: { id: data[field] },
                    };
                }
            });

            const newRecord = await prisma[model].create({
                data: createData,
            });

            return newRecord;
        } catch (error) {
            console.error(error);
            throw new Error(`Не удалось создать ${entityName}`, 500);
        }
    }

    async getAllRecords(model) {
        try {
            const records = await prisma[model].findMany();
            return records;
        } catch (error) {
            console.error(error);
            throw new Error(`Не удалось получить записи`, 500);
        }
    }

    async getRecordById(model, id, entityName) {
        try {
            const record = await prisma[model].findUnique({
                where: { id: parseInt(id) },
            });

            if (!record) {
                throw new Error(`${entityName} с ID ${id} не найден`);
            }

            return record;
        } catch (error) {
            console.error(error);
            throw new Error(`Не удалось получить ${entityName} с ID ${id}`, 500);
        }
    }

    async updateRecord(model, id, data, entityName, relationFields = []) {
        try {
            await checkRecordExists(entityName, model, 'id', id, true);

            const updateData = { ...data };
            relationFields.forEach((field) => {
                if (data[field]) {
                    updateData[field] = {
                        connect: { id: data[field] },
                    };
                }
            });

            const updatedRecord = await prisma[model].update({
                where: { id: parseInt(id) },
                data: updateData,
            });

            return updatedRecord;
        } catch (error) {
            console.error(error);
            throw new Error(`Не удалось обновить ${entityName}`, 500);
        }
    }
}

export default BaseService;