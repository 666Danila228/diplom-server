import Joi from "joi";
import { checkRecordExists } from "../../../utils/checkRecordExists.js";

const checkBrandEngineOilExists = async (name) => {
    await checkRecordExists('бренда маторного масла', 'brandEngineOil', 'name', name, false);
};

const checkBrandIdExists = async (brand_id) => {
    await checkRecordExists('бренд маторного масла', 'brandEngineOil', 'id', brand_id, true)
}

const checkModelEngineOilExists = async (name) => {
    if (!name) {
        return;
    }

    await checkRecordExists('модели маторного масла', 'modelEngineOil', 'name', name, false);
}

const checkModelIdExists = async (model_id) => {
    if (!model_id) {
        return;
    }
    await checkRecordExists('модели маторного масла', 'modelEngineOil', 'id', model_id, true);
}

const checkEngineOilIdExists = async (EngineOil_id) => {
    if (!EngineOil_id) {
        return;
    }

    await checkRecordExists('маторное масло', 'EngineOil', 'id', EngineOil_id, true);
}

const checkGarageIdExsists = async (garage_id) => {
    if (!garage_id) {
        return;
    }
    await checkRecordExists('гараж', 'garage', 'id', garage_id, true);
}

const Schemas = {

    createBrandEngineOil: Joi.object({
        name: Joi.string().min(3).max(25).pattern(new RegExp('^[a-zA-Z0-9]{1,30}$')).required().external(checkBrandEngineOilExists).messages({
            'string.base': 'Название бренда должна быть строкой',
            'string.empty': 'Название бренда не может быть пустым',
            'string.min': 'Название бренда должна быть не менее {#limit} сиволов',
            'string.max': 'Название бренда должна быть не больше {#limit} сиволов',
            'string.pattern.base': 'Название бренда должно содержать только латинские буквы и цифры',
            'any.required': 'Название бренда обязателен'
        }),
    }),

    updateBrandEngineOil: Joi.object({
        id: Joi.number().required().external(checkBrandIdExists).messages({
            'number.base': 'brand_id должен быть числовым',
            'any.required': 'brand_id обязателен'
        }),
        name: Joi.string().min(3).max(25).pattern(new RegExp('^[a-zA-Z0-9]{1,30}$')).required().external(checkBrandEngineOilExists).messages({
            'string.base': 'Название бренда должна быть строкой',
            'string.empty': 'Название бренда не может быть пустым',
            'string.min': 'Название бренда должна быть не менее {#limit} сиволов',
            'string.max': 'Название бренда должна быть не больше {#limit} сиволов',
            'string.pattern.base': 'Название бренда должно содержать только латинские буквы и цифры',
            'any.required': 'Название бренда обязателен'
        }),
    }),

    createModelEngineOil: Joi.object({
        brand_id: Joi.number().required().external(checkBrandIdExists).messages({
            'number.base': 'brand_id должен быть числовым',
            'any.required': 'brand_id обязателен'
        }),
        name: Joi.string().min(3).max(25).pattern(new RegExp('^[a-zA-Zа-яА-Я0-9\\s]{3,30}$')).required().external(checkModelEngineOilExists).messages({
            'string.base': 'Название модели должно быть строкой',
            'string.empty': 'Название модели не может быть пустым',
            'string.min': 'Название модели должно быть не менее {#limit} символов',
            'string.max': 'Название модели должно быть не больше {#limit} символов',
            'string.pattern.base': 'Название модели должно содержать только латинские буквы, цифры, пробелы и дефисы',
            'any.required': 'Название модели обязателен'
        }),
        type: Joi.string().valid('FULL_SYNTHETIC', 'SEMI_SYNTHETIC', 'MINERAL').required().messages({
            'string.base': 'Тип тосола должен быть строкой',
            'any.required': 'Тип тосола обязателен',
            'any.only': 'Тип тосола должен быть одним из: FULL_SYNTHETIC, SEMI_SYNTHETIC, MINERAL',
        }),
        viscosity: Joi.string().optional().messages({
            'string.base': 'Вязкость должна быть строкой',
        }),
        lifespan: Joi.number().positive().optional().messages({
            'number.base': 'Срок службы должен быть числом',
            'number.positive': 'Срок службы должен быть положительным числом',
        }),
    }), 

    updateModelEngineOilSchema: Joi.object({
        id: Joi.number().required().external(checkModelIdExists).messages({
            'number.base': 'id должен быть числовым',
            'any.required': 'id обязателен'
        }),
        brand_id: Joi.number().external(checkBrandIdExists).messages({
            'number.base': 'brand_id должен быть числовым',
        }),
        name: Joi.string().min(3).max(25).pattern(new RegExp('^[a-zA-Zа-яА-Я0-9\\s]{3,30}$')).external(checkModelEngineOilExists).messages({
            'string.base': 'Название бренда должна быть строкой',
            'string.empty': 'Название бренда не может быть пустым',
            'string.min': 'Название бренда должна быть не менее {#limit} сиволов',
            'string.max': 'Название бренда должна быть не больше {#limit} сиволов',
            'string.pattern.base': 'Название бренда должно содержать только латинские буквы и цифры',
        }).optional(),
        type: Joi.string().valid('FULL_SYNTHETIC', 'SEMI_SYNTHETIC', 'MINERAL').optional().messages({
            'string.base': 'Тип тосола должен быть строкой',
            'any.required': 'Тип тосола обязателен',
            'any.only': 'Тип тосола должен быть одним из: Антифриз, Тосол, Концетрат',
        }),
        viscosity: Joi.string().optional().messages({
            'string.base': 'Вязкость должна быть строкой',
        }),
        lifespan: Joi.number().positive().optional().messages({
            'number.base': 'Срок службы должен быть числом',
            'number.positive': 'Срок службы должен быть положительным числом',
        }),
    }),

    createEngineOil: Joi.object({
        model_id: Joi.number().required().external(checkModelIdExists).messages({
            'number.base': 'id должен быть числовым',
            'any.required': 'id обязателен'
        }),
        volume: Joi.number().positive().required().messages({
            'number.base': 'Объем тосола должен быть числом',
            'number.positive': 'Объем тосола должен быть положительным числом',
            'any.required': 'Объем тосола обязателен',
        }),
        garage_id: Joi.number().required().external(checkGarageIdExsists).messages({
            'number.base': 'garage_id должен быть числовым',
            'any.required': 'garage_id обязателен',
        }),
    }),

    updateEngineOil: Joi.object({
        id: Joi.number().required().external(checkEngineOilIdExists).messages({
            'number.base': 'brand_id должен быть числовым',
            'any.required': 'brand_id обязателен'
        }),
        model_id: Joi.number().optional().external(checkModelIdExists).messages({
            'number.base': 'id должен быть числовым',
            'any.required': 'id обязателен'
        }),
        volume: Joi.number().positive().optional().messages({
            'number.base': 'Объем тосола должен быть числом',
            'number.positive': 'Объем тосола должен быть положительным числом',
            'any.required': 'Объем тосола обязателен',
        }),
        garage_id: Joi.number().optional().external(checkGarageIdExsists).messages({
            'number.base': 'garage_id должен быть числовым',
            'any.required': 'garage_id обязателен',
        }),
    })

}

export default Schemas;