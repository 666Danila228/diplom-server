import prisma from '../prisma/prismaClient.js';
import { CustomJoiValidationError } from './CustomJoiValidationError.js';

export const checkRecordExists = async (entity, model, field, value, shouldExist = true) => {
    if (!prisma[model]) {
        throw new Error(`Model ${model} does not exist`);
    }

    const existingRecord = await prisma[model].findUnique({
        where: { [field]: value },
    });

    if (shouldExist && !existingRecord) {
        console.log(`${field} "${value}" does not exist in ${model} for entity ${entity}`);
        throw new CustomJoiValidationError(`Данный ${field} не существует для ${entity}`, [{ message: `Данный ${field} не существует для ${entity}`, path: [`${field}_${model}`], type: `${field}.notExists` }], null);
    }

    if (!shouldExist && existingRecord) {
        console.log(`${field} "${value}" already exists in ${model} for entity ${entity}`);
        throw new CustomJoiValidationError(`Данный ${field} уже существует для ${entity}`, [{ message: `Данный ${field} уже существует для ${entity}`, path: [`${field}_${model}`], type: `${field}.exists` }], null);
    }
};