import Joi from "joi";
import { checkRecordExists } from "../../../utils/checkRecordExists";

const checkBrandCoolantExists = async (name) => {
    await checkRecordExists('бренда тасола', 'brandCoolant', 'name', name, false);
};

const checkBrandIdExists = async (brand_id) => {
    await checkRecordExists('бренд тасола', 'brandCoolant', 'id', brand_id, true)
}

const checkModelCoolantExists = async (name) => {
    if (!name) {
        return;
    }

    await checkRecordExists('модели тасола', 'modelCoolant', 'name', name, false);
}

const checkModelIdExists = async (model_id) => {
    if (!model_id) {
        return;
    }
    await checkRecordExists('модели тасола', 'modelTire', 'id', model_id, true);
}

const checkCoolantIdExists = async (tire_id) => {
    if (!tire_id) {
        return;
    }

    await checkRecordExists('тасол', 'tire', 'id', tire_id, true);
}

const checkGarageIdExsists = async (garage_id) => {
    if (!garage_id) {
        return;
    }
    await checkRecordExists('гараж', 'garage', 'id', garage_id, true);
}

const Schemas = {
    createBrandCoolant: Joi.object({
        name: Joi.string().min(3).max(25).pattern(new RegExp('^[a-zA-Z0-9]{1,30}$')).required().external(checkBrandCoolantExists).messages({
            'string.base': 'Название бренда должна быть строкой',
            'string.empty': 'Название бренда не может быть пустым',
            'string.min': 'Название бренда должна быть не менее {#limit} сиволов',
            'string.max': 'Название бренда должна быть не больше {#limit} сиволов',
            'string.pattern.base': 'Название бренда должно содержать только латинские буквы и цифры',
            'any.required': 'Название бренда обязателен'
        }),
    }),

    updateBrandCoolant: Joi.object({
        id: Joi.number().required().external(checkBrandIdExists).messages({
            'number.base': 'brand_id должен быть числовым',
            'any.required': 'brand_id обязателен'
        }),
        name: Joi.string().min(3).max(25).pattern(new RegExp('^[a-zA-Z0-9]{1,30}$')).required().external(checkBrandCoolantExists).messages({
            'string.base': 'Название бренда должна быть строкой',
            'string.empty': 'Название бренда не может быть пустым',
            'string.min': 'Название бренда должна быть не менее {#limit} сиволов',
            'string.max': 'Название бренда должна быть не больше {#limit} сиволов',
            'string.pattern.base': 'Название бренда должно содержать только латинские буквы и цифры',
            'any.required': 'Название бренда обязателен'
        }),
    }),

    createModelCoolant: Joi.object({
        brand_id: Joi.number().required().external(checkBrandIdExists).messages({
            'number.base': 'brand_id должен быть числовым',
            'any.required': 'brand_id обязателен'
        }),
        name: Joi.string().min(3).max(25).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().external(checkModelCoolantExists).messages({
            'string.base': 'Название модели должно быть строкой',
            'string.empty': 'Название модели не может быть пустым',
            'string.min': 'Название модели должно быть не менее {#limit} символов',
            'string.max': 'Название модели должно быть не больше {#limit} символов',
            'string.pattern.base': 'Название модели должно содержать только латинские буквы и цифры',
            'any.required': 'Название модели обязателен'
        })
    }),

    updateModelCoolantSchema: Joi.object({
        id: Joi.number().required().external(checkModelIdExists).messages({
            'number.base': 'id должен быть числовым',
            'any.required': 'id обязателен'
        }),
        brand_id: Joi.number().external(checkBrandIdExists).messages({
            'number.base': 'brand_id должен быть числовым',
        }),
        name: Joi.string().min(3).max(25).pattern(new RegExp('^[a-zA-Z0-9]{1,30}$')).external(checkModelCoolantExists).messages({
            'string.base': 'Название бренда должна быть строкой',
            'string.empty': 'Название бренда не может быть пустым',
            'string.min': 'Название бренда должна быть не менее {#limit} сиволов',
            'string.max': 'Название бренда должна быть не больше {#limit} сиволов',
            'string.pattern.base': 'Название бренда должно содержать только латинские буквы и цифры',
        }).optional(),
    }),

    createCoolant: Joi.object({
        model_id: Joi.number().required().external(checkModelIdExists).messages({
            'number.base': 'id должен быть числовым',
            'any.required': 'id обязателен'
        }),
        type: Joi.string().valid('ANTIFREEZE', 'TOXOL', 'CONCENTRATE').required().messages({
            'string.base': 'Тип тосола должен быть строкой',
            'any.required': 'Тип тосола обязателен',
            'any.only': 'Тип тосола должен быть одним из: Антифриз, Тосол, Концетрат',
        }),
        volume: Joi.number().positive().required().messages({
            'number.base': 'Объем тосола должен быть числом',
            'number.positive': 'Объем тосола должен быть положительным числом',
            'any.required': 'Объем тосола обязателен',
        }),
        expiration_date: Joi.date().iso().optional().messages({
            'date.base': 'Срок годности должен быть датой',
            'date.format': 'Срок годности должен быть в формате ISO (YYYY-MM-DD)',
        }),
        freezing_point: Joi.number().optional().messages({
            'number.base': 'Температура замерзания должна быть числом',
        }),
        boiling_point: Joi.number().optional().messages({
            'number.base': 'Температура кипения должна быть числом',
        }),
        composition: Joi.string().optional().messages({
            'string.base': 'Состав тосола должен быть строкой',
        }),
        garage_id: Joi.number().required().external(checkGarageIdExists).messages({
            'number.base': 'garage_id должен быть числовым',
            'any.required': 'garage_id обязателен',
        }),
    }),

    updateCooolant: Joi.object({
        id: Joi.number().required().external(checkCoolantIdExists).messages({
            'number.base': 'brand_id должен быть числовым',
            'any.required': 'brand_id обязателен'
        }),
        model_id: Joi.number().required().external(checkModelIdExists).messages({
            'number.base': 'id должен быть числовым',
            'any.required': 'id обязателен'
        }),
        type: Joi.string().valid('ANTIFREEZE', 'TOXOL', 'CONCENTRATE').required().messages({
            'string.base': 'Тип тосола должен быть строкой',
            'any.required': 'Тип тосола обязателен',
            'any.only': 'Тип тосола должен быть одним из: Антифриз, Тосол, Концетрат',
        }),
        volume: Joi.number().positive().required().messages({
            'number.base': 'Объем тосола должен быть числом',
            'number.positive': 'Объем тосола должен быть положительным числом',
            'any.required': 'Объем тосола обязателен',
        }),
        expiration_date: Joi.date().iso().optional().messages({
            'date.base': 'Срок годности должен быть датой',
            'date.format': 'Срок годности должен быть в формате ISO (YYYY-MM-DD)',
        }),
        freezing_point: Joi.number().optional().messages({
            'number.base': 'Температура замерзания должна быть числом',
        }),
        boiling_point: Joi.number().optional().messages({
            'number.base': 'Температура кипения должна быть числом',
        }),
        composition: Joi.string().optional().messages({
            'string.base': 'Состав тосола должен быть строкой',
        }),
        garage_id: Joi.number().required().external(checkGarageIdExists).messages({
            'number.base': 'garage_id должен быть числовым',
            'any.required': 'garage_id обязателен',
        }),
    })
}

export default Schemas;