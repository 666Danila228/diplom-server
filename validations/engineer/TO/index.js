import Joi from "joi";
import { checkRecordExists } from '../../../utils/checkRecordExists.js';
import prisma from "../../../prisma/prismaClient.js";

const checkTypeIdExists = async (type_id) => {
    if (!type_id) {
        return;
    }
    await checkRecordExists('модели машин', 'modelCar', 'id', type_id, true);
}

const checkCarIdExsist = async (id) => {
    if (!id) return;
    await checkRecordExists('машина', 'car', 'id', id, true);
}

const checkCarIdExists = async (car_id) => {
    if (!car_id) return;
    await checkRecordExists('машина', 'car', 'id', car_id, true);
};

const checkGarageIdExists = async (garage_id) => {
    if (!garage_id) return;
    await checkRecordExists('гараж', 'garage', 'id', garage_id, true);
};

const checkConsumableIdExists = async (consumable_id) => {
    if (!consumable_id) return;
    await checkRecordExists('расходный материал', 'consumable', 'id', consumable_id, true);
};

const checkAvtoServiceIdExsist = async (avtoService_id) => {
    if (!avtoService_id) return;
    await checkRecordExists('Автосервис', 'service', 'id', avtoService_id, true);
}

const consumableSchema = Joi.object({
    consumableId: Joi.number().required().external(checkConsumableIdExists).messages({
        'number.base': 'consumableId должен быть числовым',
        'any.required': 'consumableId обязателен',
    }),
    quantityUsed: Joi.number().positive().required().messages({
        'number.base': 'Количество должно быть числом',
        'number.positive': 'Количество должно быть положительным числом',
        'any.required': 'Количество обязательно',
    }),
});

const Schemas = {

    scheduleInitialTO: Joi.object({
        carId: Joi.number().required().external(checkCarIdExsist).messages({
            'number.base': 'id должен быть числовым',
        }),
        typeCarId: Joi.number().optional().external(checkTypeIdExists).messages({
            'number.base': 'type_car_id должен быть числовым',
        }),
    }),

    createTOHistorySchema: Joi.object({
        car_id: Joi.number().required().external(checkCarIdExists).messages({
            'number.base': 'car_id должен быть числовым',
            'any.required': 'car_id обязателен',
        }),
        scheduled_date: Joi.date().iso().required().messages({
            'date.base': 'Дата должна быть в формате ISO',
            'any.required': 'Дата обязательна',
        }),
        status: Joi.string().valid('SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED').required().messages({
            'string.base': 'Статус должен быть строкой',
            'any.required': 'Статус обязателен',
            'any.only': 'Статус должен быть одним из: SCHEDULED, IN_PROGRESS, COMPLETED, CANCELLED',
        }),
        to_type: Joi.string().valid('SCHEDULED', 'UNSCHEDULED', 'EMERGENCY').required().messages({
            'string.base': 'Тип ТО должен быть строкой',
            'any.required': 'Тип ТО обязателен',
            'any.only': 'Тип ТО должен быть одним из: SCHEDULED, UNSCHEDULED, EMERGENCY',
        }),
        description: Joi.string().min(3).max(500).required().messages({
            'string.base': 'Описание должно быть строкой',
            'string.empty': 'Описание не может быть пустым',
            'string.min': 'Описание должно быть не менее {#limit} символов',
            'string.max': 'Описание должно быть не более {#limit} символов',
            'any.required': 'Описание обязательно',
        }),
        service_id: Joi.number().optional().external(checkAvtoServiceIdExsist).messages({
            'number.base': 'service_id должен быть числовым',
        }),
        price: Joi.number().positive().optional().messages({
            'number.base': 'Стоимость должна быть числом',
            'number.positive': 'Стоимость должна быть положительным числом',
        }),
        invoice_file: Joi.string().optional().messages({
            'string.base': 'Ссылка на файл должна быть строкой',
        }),
    }),

    updateTOHistorySchema: Joi.object({
        id: Joi.number().required().messages({
            'number.base': 'id должен быть числовым',
            'any.required': 'id обязателен',
        }),
        car_id: Joi.number().optional().external(checkCarIdExists).messages({
            'number.base': 'car_id должен быть числовым',
        }),
        scheduled_date: Joi.date().iso().optional().messages({
            'date.base': 'Дата должна быть в формате ISO',
        }),
        status: Joi.string().valid('SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED').optional().messages({
            'string.base': 'Статус должен быть строкой',
            'any.only': 'Статус должен быть одним из: SCHEDULED, IN_PROGRESS, COMPLETED, CANCELLED',
        }),
        to_type: Joi.string().valid('SCHEDULED', 'UNSCHEDULED', 'EMERGENCY').optional().messages({
            'string.base': 'Тип ТО должен быть строкой',
            'any.only': 'Тип ТО должен быть одним из: SCHEDULED, UNSCHEDULED, EMERGENCY',
        }),
        description: Joi.string().min(3).max(500).optional().messages({
            'string.base': 'Описание должно быть строкой',
            'string.empty': 'Описание не может быть пустым',
            'string.min': 'Описание должно быть не менее {#limit} символов',
            'string.max': 'Описание должно быть не более {#limit} символов',
        }),
        service_id: Joi.number().optional().external(checkAvtoServiceIdExsist).messages({
            'number.base': 'service_id должен быть числовым',
        }),
        price: Joi.number().positive().optional().messages({
            'number.base': 'Стоимость должна быть числом',
            'number.positive': 'Стоимость должна быть положительным числом',
        }),
        invoice_file: Joi.string().optional().messages({
            'string.base': 'Ссылка на файл должна быть строкой',
        }),
    }),

    consumableSchema: Joi.object({
        consumableId: Joi.number().required().external(checkConsumableIdExists).messages({
            'number.base': 'consumableId должен быть числовым',
            'any.required': 'consumableId обязателен',
        }),
        quantityUsed: Joi.number().positive().required().messages({
            'number.base': 'Количество должно быть числом',
            'number.positive': 'Количество должно быть положительным числом',
            'any.required': 'Количество обязательно',
        }),
    }),

    addConsumablesSchema: Joi.object({
        consumables: Joi.array().items(consumableSchema).required().messages({
            'array.base': 'Расходные материалы должны быть массивом',
            'any.required': 'Расходные материалы обязательны',
        }),
    }),

    completeTOSchema: Joi.object({
        description: Joi.string().min(3).max(500).required().messages({
            'string.base': 'Описание должно быть строкой',
            'string.empty': 'Описание не может быть пустым',
            'string.min': 'Описание должно быть не менее {#limit} символов',
            'string.max': 'Описание должно быть не более {#limit} символов',
            'any.required': 'Описание обязательно',
        }),
        price: Joi.number().positive().optional().messages({
            'number.base': 'Стоимость должна быть числом',
            'number.positive': 'Стоимость должна быть положительным числом',
        }),
        invoice_file: Joi.string().optional().messages({
            'string.base': 'Ссылка на файл должна быть строкой',
        }),
        consumables: Joi.array().items(consumableSchema).optional().messages({
            'array.base': 'Расходные материалы должны быть массивом',
        }),
    }),
}

export default Schemas