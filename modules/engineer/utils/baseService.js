import prisma from "../../../prisma/prismaClient.js";
import { checkRecordExists } from "../../../utils/checkRecordExists.js";
import { generateRelationsFromPrismaSchema } from "../../../utils/prismaRelations.js";

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
            throw new Error(`Не удалось создать ${entityName}`);
        }
    }

    async getAllRecords(model) {
        try {
            return await prisma[model].findMany({
                // where: {
                //     deletedAt: null         !!!!!!!!ПОДУМАЙ НАДО ЛИ ЭТО!!!!!!!!
                // }
            });
        } catch (error) {
            console.error(error);
            throw new Error(`Не удалось получить записи`);
        }
    }

    async getRecordById(model, id, entityName) {
        try {
            const record = await prisma[model].findUnique({
                where: { 
                    id: parseInt(id),
                    // deletedAt: null,    !!!!!!!!ПОДУМАЙ НАДО ЛИ ЭТО!!!!!!!!
                 },
            });

            if (!record) {
                throw new Error(`${entityName} с ID ${id} не найден`);
            }

            return record;
        } catch (error) {
            console.error(error);
            throw new Error(`Не удалось получить ${entityName} с ID ${id}`);
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

            return await prisma[model].update({
                where: { 
                    id: parseInt(id),
                    // deletedAt: null,   !!!!!!!!ПОДУМАЙ НАДО ЛИ ЭТО!!!!!!!!
                 },
                data: updateData,
            });
        } catch (error) {
            console.error(error);
            throw new Error(`Не удалось обновить ${entityName}`);
        }
    }

    async deleteRecord(model, id, entityName, isUsed) {
        try {
            console.log(`Удаление записи ${model} с ID ${id}`);

            if (isUsed) {
                console.log(`Запись используется, выполняется мягкое удаление`);
                await prisma[model].update({
                    where: { 
                        id: parseInt(id),
                        // deletedAt: null, !!!!!!!!ПОДУМАЙ НАДО ЛИ ЭТО!!!!!!!!
                     },
                    data: { deletedAt: new Date() },
                });
                console.log(`Запись ${model} с ID ${id} помечена как удаленная`);
                return { message: `${entityName} успешно помечена как удаленная` };
            } else {
                console.log(`Запись не используется, выполняется жесткое удаление`);
                await prisma[model].delete({
                    where: { id: parseInt(id) },
                });
                console.log(`Запись ${model} с ID ${id} удалена физически`);
                return { message: `${entityName} успешно удалена` };
            }
        } catch (error) {
            console.error(`Ошибка при удалении записи:`, error);
            if (error.code === 'P2003') {
                throw new Error(`Не удалось удалить ${entityName} из-за связанных данных`);
            }
            throw new Error(`Произошла ошибка при удалении ${entityName}`);
        }
    }

    // Метод для удаления нескольких записей
    async deleteManyRecords(model, ids, entityName) {
        try {
            if (!Array.isArray(ids) || ids.length === 0) {
                throw new Error('Необходимо передать массив ID для удаления');
            }

            const results = await Promise.all(
                ids.map(async (id) => {
                    const isUsed = await this.isRecordUsed(model, id);

                    if (isUsed) {
                        await prisma[model].update({
                            where: { 
                                id: parseInt(id),
                                // deletedAt: null, !!!!!!!!ПОДУМАЙ НАДО ЛИ ЭТО!!!!!!!!
                             },
                            data: { deletedAt: new Date() },
                        });
                        return { id, status: 'soft-deleted' };
                    } else {
                        await prisma[model].delete({
                            where: { id: parseInt(id) },
                        });
                        return { id, status: 'deleted' };
                    }
                })
            );

            return {
                message: `${entityName} успешно обработаны`,
                results,
            };
        } catch (error) {
            console.error(error);
            throw new Error(`Не удалось удалить ${entityName}`, 500);
        }
    }

    // Метод для проверки использования записи (должен быть переопределен в дочерних классах)
    async isRecordUsed(model, id) {
        throw new Error(`Метод isRecordUsed не реализован для модели ${model}`);
    }

}

export default BaseService;
