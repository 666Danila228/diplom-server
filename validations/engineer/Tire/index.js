import Joi from 'joi';
import { checkRecordExists } from '../../../utils/checkRecordExists.js';

const checkBrandTireExists = async (name) => {
    await checkRecordExists('бренда шин', 'brandTire', 'name', name, false);
};

const checkBrandIdExists = async (brand_id) => {
    await checkRecordExists('бренд шин', 'brandTire', 'id', brand_id, true)
}

const checkModelTireExists = async (name) => {
    if (!name) {
        return;
    }

    await checkRecordExists('модели шин', 'modelTire', 'name', name, false);
}

const checkModelIdExists = async (model_id) => {
    if (!model_id) {
        return;
    }
    await checkRecordExists('модели шин', 'modelTire', 'id', model_id, true);
}

const checkGarageIdExists = async (garage_id) => {
    if (!garage_id) {
        return;
    }
    await checkRecordExists('гарж айди', 'garage', 'id', garage_id, true);
}

const Schemas = {
    createBrandTireSchema: Joi.object({
        name: Joi.string().min(3).max(25).pattern(new RegExp('^[a-zA-Z0-9]{1,30}$')).required().external(checkBrandTireExists).messages({
            'string.base': 'Название бренда должна быть строкой',
            'string.empty': 'Название бренда не может быть пустым',
            'string.min': 'Название бренда должна быть не менее {#limit} сиволов',
            'string.max': 'Название бренда должна быть не больше {#limit} сиволов',
            'string.pattern.base': 'Название бренда должно содержать только латинские буквы и цифры',
            'any.required': 'Название бренда обязателен'
        }),
    }),

    updateBrandTire: Joi.object({
        id: Joi.number().required().external(checkBrandIdExists).messages({
            'number.base': 'brand_id должен быть числовым',
            'any.required': 'brand_id обязателен'
        }),
        name: Joi.string().min(3).max(25).pattern(new RegExp('^[a-zA-Z0-9]{1,30}$')).required().external(checkBrandTireExists).messages({
            'string.base': 'Название бренда должна быть строкой',
            'string.empty': 'Название бренда не может быть пустым',
            'string.min': 'Название бренда должна быть не менее {#limit} сиволов',
            'string.max': 'Название бренда должна быть не больше {#limit} сиволов',
            'string.pattern.base': 'Название бренда должно содержать только латинские буквы и цифры',
            'any.required': 'Название бренда обязателен'
        }),
    }),

    createModelTire: Joi.object({
        brand_id: Joi.number().required().external(checkBrandIdExists).messages({
            'number.base': 'brand_id должен быть числовым',
            'any.required': 'brand_id обязателен'
        }),
        name: Joi.string().min(3).max(25).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().external(checkModelTireExists).messages({
            'string.base': 'Название модели должно быть строкой',
            'string.empty': 'Название модели не может быть пустым',
            'string.min': 'Название модели должно быть не менее {#limit} символов',
            'string.max': 'Название модели должно быть не больше {#limit} символов',
            'string.pattern.base': 'Название модели должно содержать только латинские буквы и цифры',
            'any.required': 'Название модели обязателен'
        })
    }),

    updateModelTireSchema: Joi.object({
        id: Joi.number().required().external(checkBrandIdExists).messages({
            'number.base': 'id должен быть числовым',
            'any.required': 'id обязателен'
        }),
        brand_id: Joi.number().external(checkBrandIdExists).messages({
            'number.base': 'brand_id должен быть числовым',
        }),
        name: Joi.string().min(3).max(25).pattern(new RegExp('^[a-zA-Z0-9]{1,30}$')).external(checkBrandTireExists).messages({
            'string.base': 'Название бренда должна быть строкой',
            'string.empty': 'Название бренда не может быть пустым',
            'string.min': 'Название бренда должна быть не менее {#limit} сиволов',
            'string.max': 'Название бренда должна быть не больше {#limit} сиволов',
            'string.pattern.base': 'Название бренда должно содержать только латинские буквы и цифры',
        }).optional(),
    }),

    createTire: Joi.object({
        model_id: Joi.number().required().external(checkModelIdExists).messages({
            'number.base': 'model_id должно быть числом',
            'any.required': 'model_id обязателен'
        }),
        size: Joi.string().min(9).max(15).pattern(new RegExp('^\\d{3}/\\d{2}R\\d{2}$')).required().messages({
            'string.base': 'Размер должен быть сторокй',
            'string.empty': 'Размер не может быть пустым',
            'string.min': 'Размер должен быть не менее {#limit} символов',
            'string.max': 'Размер должен быть не больше {#limit} символов',
            'string.pattern.base': 'Размер должен соответсвовать формату XXX/XXRXX',
            'any.required': 'Размер обязателен'
        }),
        estimated_mileage: Joi.number().min(0).required().messages({
            'number.base': 'Примерный пробег должен быть числом',
            'any.required': 'Примерный пробег обязателен'
        }),
        remaining_mileage: Joi.number().min(0).required().messages({
            'number.base': 'Факический пробег должен быть числом',
            'any.required': 'Факический пробег обязателен'
        }),
        garage_id: Joi.number().required().external(checkGarageIdExists).messages({
            'number.base': 'Гаражный номер должен быть числом',
            'any.required': 'Гаражный номер обязателен'
        }),
    }),

    updateTire: Joi.object({
        id: Joi.number().required().external(checkBrandIdExists).messages({
            'number.base': 'brand_id должен быть числовым',
            'any.required': 'brand_id обязателен'
        }),
        model_id: Joi.number().external(checkModelIdExists).messages({
            'number.base': 'model_id должно быть числом',
            'any.required': 'model_id обязателен'
        }),
        size: Joi.string().min(9).max(15).pattern(new RegExp('^\\d{3}/\\d{2}R\\d{2}$')).messages({
            'string.base': 'Размер должен быть сторокй',
            'string.empty': 'Размер не может быть пустым',
            'string.min': 'Размер должен быть не менее {#limit} символов',
            'string.max': 'Размер должен быть не больше {#limit} символов',
            'string.pattern.base': 'Размер должен соответсвовать формату XXX/XXRXX',
            'any.required': 'Размер обязателен'
        }),
        estimated_mileage: Joi.number().min(0).messages({
            'number.base': 'Примерный пробег должен быть числом',
            'any.required': 'Примерный пробег обязателен'
        }),
        remaining_mileage: Joi.number().min(0).messages({
            'number.base': 'Факический пробег должен быть числом',
            'any.required': 'Факический пробег обязателен'
        }),
        garage_id: Joi.number().external(checkGarageIdExists).messages({
            'number.base': 'Гаражный номер должен быть числом',
            'any.required': 'Гаражный номер обязателен'
        }),
    }),
}

export default Schemas;
