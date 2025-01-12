import Joi from "joi";
import prisma from "../../../prisma/prismaClient.js";
import { checkRecordExists } from "../../../utils/checkRecordExists.js";

const checkAvtoServiceIdExsist = async (avtoService_id) => {
    if (!avtoService_id) return;
    await checkRecordExists('Автосервис', 'service', 'id', avtoService_id, true);
}

const Schemas = {
    createAvtoService: Joi.object({
        name: Joi.string().min(3).max(100).required().messages({
            'string.base': 'Название сервиса должно быть строкой',
            'string.empty': 'Название сервиса не может быть пустым',
            'string.min': 'Название сервиса должно быть не менее {#limit} символов',
            'string.max': 'Название сервиса должно быть не более {#limit} символов',
            'any.required': 'Название сервиса обязательно',
        }),
        address: Joi.string().min(5).max(200).required().messages({
            'string.base': 'Адрес должен быть строкой',
            'string.empty': 'Адрес не может быть пустым',
            'string.min': 'Адрес должен быть не менее {#limit} символов',
            'string.max': 'Адрес должен быть не более {#limit} символов',
            'any.required': 'Адрес обязателен',
        }),
        phone: Joi.string().pattern(/^\+?[0-9]{10,15}$/).required().messages({
            'string.base': 'Телефон должен быть строкой',
            'string.empty': 'Телефон не может быть пустым',
            'string.pattern.base': 'Телефон должен быть в формате +79991234567 или 89991234567',
            'any.required': 'Телефон обязателен',
        }),
        description: Joi.string().max(500).optional().messages({
            'string.base': 'Описание должно быть строкой',
            'string.max': 'Описание должно быть не более {#limit} символов',
        }),
    }),

    updateAvtoService: Joi.object({
        id: Joi.number().required().external(checkAvtoServiceIdExsist).messages({
            'number.base': 'id Должен быть числовым',
            'any.required': 'id обязателен'
        }),
        name: Joi.string().min(3).max(100).optional().messages({
            'string.base': 'Название сервиса должно быть строкой',
            'string.empty': 'Название сервиса не может быть пустым',
            'string.min': 'Название сервиса должно быть не менее {#limit} символов',
            'string.max': 'Название сервиса должно быть не более {#limit} символов',
        }),
        address: Joi.string().min(5).max(200).optional().messages({
            'string.base': 'Адрес должен быть строкой',
            'string.empty': 'Адрес не может быть пустым',
            'string.min': 'Адрес должен быть не менее {#limit} символов',
            'string.max': 'Адрес должен быть не более {#limit} символов',
        }),
        phone: Joi.string().pattern(/^\+?[0-9]{10,15}$/).optional().messages({
            'string.base': 'Телефон должен быть строкой',
            'string.empty': 'Телефон не может быть пустым',
            'string.pattern.base': 'Телефон должен быть в формате +79991234567 или 89991234567',
        }),
        description: Joi.string().max(500).optional().messages({
            'string.base': 'Описание должно быть строкой',
            'string.max': 'Описание должно быть не более {#limit} символов',
        }),
    }),
}

export default Schemas;