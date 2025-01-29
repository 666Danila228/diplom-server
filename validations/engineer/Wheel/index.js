import Joi from "joi";
import { checkRecordExists } from '../../../utils/checkRecordExists.js';
import prisma from "../../../prisma/prismaClient.js";

const checkTireExists = async (tire_id) => {
    if (!tire_id) return;
    await checkRecordExists('шина', 'tire', 'id', tire_id, true);
};

const checkDiskExists = async (disk_id) => {
    if (!disk_id) return;
    await checkRecordExists('диск', 'disk', 'id', disk_id, true);
};

const checkTireStatus = async (tire_id) => {
    if (!tire_id) return;
    const tire = await prisma.tire.findUnique({ where: { id: tire_id } });
    if (tire.status !== 'IN_STOCK') {
        throw new Error('Шина уже используется');
    }
};

const checkDiskStatus = async (disk_id) => {
    if (!disk_id) return;
    const disk = await prisma.disk.findUnique({ where: { id: disk_id } });
    if (disk.status !== 'IN_STOCK') {
        throw new Error('Диск уже используется');
    }
};

const checkWheelIdExist = async (wheel_id) => {
    if (!wheel_id) return;
    await checkRecordExists('Колёса', 'TireOnDisk', 'id', wheel_id, true);
};

const Schemas = {
    createWheel: Joi.object({
        tire_id: Joi.number().required().external(checkTireExists).external(checkTireStatus).messages({
            'number.base': 'tire_id должен быть числовым',
            'any.required': 'tire_id обязателен',
        }),
        disk_id: Joi.number().required().external(checkDiskExists).external(checkDiskStatus).messages({
            'number.base': 'disk_id должен быть числовым',
            'any.required': 'disk_id обязателен',
        }),
    }),

    updateWheel: Joi.object({
        id: Joi.number().required().external(checkWheelIdExist).messages({
            'number.base': 'brand_id должен быть числовым',
            'any.required': 'brand_id обязателен'
        }),
        tire_id: Joi.number().required().external(checkTireExists).external(checkTireStatus).messages({
            'number.base': 'tire_id должен быть числовым',
            'any.required': 'tire_id обязателен',
        }),
        disk_id: Joi.number().required().external(checkDiskExists).external(checkDiskStatus).messages({
            'number.base': 'disk_id должен быть числовым',
            'any.required': 'disk_id обязателен',
        }),
    }),
}

export default Schemas;