import Joi from "joi";
import prisma from "../../../prisma/prismaClient.js";
import { checkRecordExists } from "../../../utils/checkRecordExists.js";

const checkHeadColumnIdExist = async (id) => {
    if (!id) return;
    await checkRecordExists('Начальник колоны', 'User', 'id', id, true);

    const user = await prisma.user.findUnique({
        where: { id },
        select: { role_id: true },
    });

    if (user.role_id !== 3) {
        throw new Error('У пользователя неподходящая роль');
    }
}

const checkGarageIdExist = async (id) => {
    if(!id) return;
    await checkRecordExists('Гараж', 'Garage', 'id', id, true);
}

const Schemas = {
    createGarage: Joi.object({
        name: Joi.string().pattern(new RegExp('^[а-яА-Я]')).min(3).max(25).required().messages({
            'string.base': 'Название гаража должна быть строкой',
            'string.empty': 'Название гаража не может быть пустым',
            'string.min': 'Название гаража должна быть не менее {#limit} символов',
            'string.max': 'Название гаража должна быть не более {#limit} символов',
            'any.required': 'Название гаража обязательна',
        }),
        head_column: Joi.number().required().external(checkHeadColumnIdExist).messages({
            'number.base': 'id Должен быть числовым',
            'any.required': 'id обязателен'
        }),
    }),

    updateGarage: Joi.object({
        id: Joi.number().required().external(checkGarageIdExist).messages({
            'number.base': 'id Должен быть числовым',
            'any.required': 'id обязателен'
        }),
        name: Joi.string().pattern(new RegExp('^[а-яА-Я]')).min(3).max(25).required().messages({
            'string.base': 'Название гаража должна быть строкой',
            'string.empty': 'Название гаража не может быть пустым',
            'string.min': 'Название гаража должна быть не менее {#limit} символов',
            'string.max': 'Название гаража должна быть не более {#limit} символов',
            'any.required': 'Название гаража обязательна',
        }),
        head_column: Joi.number().required().external(checkHeadColumnIdExist).messages({
            'number.base': 'id Должен быть числовым',
            'any.required': 'id обязателен'
        }),
    })
}

export default Schemas;