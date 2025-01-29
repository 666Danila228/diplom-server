import Joi from "joi";
import { checkRecordExists } from "../../../utils/checkRecordExists.js";

const checkBrandDiskExists = async (name) => {
    await checkRecordExists('бренда дисков', 'brandDisk', 'name', name, false);
};

const checkBrandIdExists = async (brand_id) => {
    await checkRecordExists('бренд дисков', 'brandDisk', 'id', brand_id, true)
}

const checkModelDiskExists = async (name) => {
    if (!name) {
        return;
    }

    await checkRecordExists('модели дисков', 'modelDisk', 'name', name, false);
}

const checkModelIdExists = async (model_id) => {
    if (!model_id) {
        return;
    }
    await checkRecordExists('модели шин', 'modelTire', 'id', model_id, true);
}

const checkDiskIdExists = async (tire_id) => {
    if (!tire_id) {
        return;
    }

    await checkRecordExists('шина', 'tire', 'id', tire_id, true);
}

const checkGarageIdExsists = async (garage_id) => {
    if (!garage_id) {
        return;
    }
    await checkRecordExists('гараж', 'garage', 'id', garage_id, true);
}

const Schemas = {
    createBrandDisk: Joi.object({
        name: Joi.string().min(3).max(25).pattern(new RegExp('^[a-zA-Z0-9]{1,30}$')).required().external(checkBrandDiskExists).messages({
            'string.base': 'Название бренда должна быть строкой',
            'string.empty': 'Название бренда не может быть пустым',
            'string.min': 'Название бренда должна быть не менее {#limit} сиволов',
            'string.max': 'Название бренда должна быть не больше {#limit} сиволов',
            'string.pattern.base': 'Название бренда должно содержать только латинские буквы и цифры',
            'any.required': 'Название бренда обязателен'
        }),
    }),

    updateBrandDisk: Joi.object({
        id: Joi.number().required().external(checkBrandIdExists).messages({
            'number.base': 'brand_id должен быть числовым',
            'any.required': 'brand_id обязателен'
        }),
        name: Joi.string().min(3).max(25).pattern(new RegExp('^[a-zA-Z0-9]{1,30}$')).required().external(checkBrandDiskExists).messages({
            'string.base': 'Название бренда должна быть строкой',
            'string.empty': 'Название бренда не может быть пустым',
            'string.min': 'Название бренда должна быть не менее {#limit} сиволов',
            'string.max': 'Название бренда должна быть не больше {#limit} сиволов',
            'string.pattern.base': 'Название бренда должно содержать только латинские буквы и цифры',
            'any.required': 'Название бренда обязателен'
        }),
    }),

    createModelDisk: Joi.object({
        brand_id: Joi.number().required().external(checkBrandIdExists).messages({
            'number.base': 'brand_id должен быть числовым',
            'any.required': 'brand_id обязателен'
        }),
        name: Joi.string().min(3).max(25).pattern(new RegExp('^[a-zA-Zа-яА-Я0-9\\s]{3,30}$')).required().external(checkModelDiskExists).messages({
            'string.base': 'Название модели должно быть строкой',
            'string.empty': 'Название модели не может быть пустым',
            'string.min': 'Название модели должно быть не менее {#limit} символов',
            'string.max': 'Название модели должно быть не больше {#limit} символов',
            'string.pattern.base': 'Название модели должно содержать только латинские буквы и цифры',
            'any.required': 'Название модели обязателен'
        }),
        material: Joi.string().min(2).max(25).messages({
            'string.base': 'Название материала должна быть строкой',
            'string.empty': 'Название материала не может быть пустым',
            'string.min': 'Название материала должна быть не менее {#limit} сиволов',
            'string.max': 'Название материала должна быть не больше {#limit} сиволов',
        }),
        size: Joi.string().min(9).max(15).pattern(new RegExp('^\\d{3}/\\d{2}R\\d{2}$')).required().messages({
            'string.base': 'Размер должен быть сторокй',
            'string.empty': 'Размер не может быть пустым',
            'string.min': 'Размер должен быть не менее {#limit} символов',
            'string.max': 'Размер должен быть не больше {#limit} символов',
            'string.pattern.base': 'Размер должен соответсвовать формату XXX/XXRXX',
            'any.required': 'Размер обязателен'
        }),

    }),

    updateModelDiskSchema: Joi.object({
        id: Joi.number().required().external(checkModelIdExists).messages({
            'number.base': 'id должен быть числовым',
            'any.required': 'id обязателен'
        }),
        brand_id: Joi.number().external(checkBrandIdExists).messages({
            'number.base': 'brand_id должен быть числовым',
        }),
        name: Joi.string().min(3).max(25).pattern(new RegExp('^[a-zA-Z0-9]{1,30}$')).external(checkModelDiskExists).messages({
            'string.base': 'Название бренда должна быть строкой',
            'string.empty': 'Название бренда не может быть пустым',
            'string.min': 'Название бренда должна быть не менее {#limit} сиволов',
            'string.max': 'Название бренда должна быть не больше {#limit} сиволов',
            'string.pattern.base': 'Название бренда должно содержать только латинские буквы и цифры',
        }).optional(),
        material: Joi.string().min(2).max(25).messages({
            'string.base': 'Название материала должна быть строкой',
            'string.empty': 'Название материала не может быть пустым',
            'string.min': 'Название материала должна быть не менее {#limit} сиволов',
            'string.max': 'Название материала должна быть не больше {#limit} сиволов',
        }),
        size: Joi.string().min(9).max(15).pattern(new RegExp('^\\d{3}/\\d{2}R\\d{2}$')).required().messages({
            'string.base': 'Размер должен быть сторокй',
            'string.empty': 'Размер не может быть пустым',
            'string.min': 'Размер должен быть не менее {#limit} символов',
            'string.max': 'Размер должен быть не больше {#limit} символов',
            'string.pattern.base': 'Размер должен соответсвовать формату XXX/XXRXX',
            'any.required': 'Размер обязателен'
        }),
    }),

    createDisk: Joi.object({
        model_id: Joi.number().required().external(checkModelIdExists).messages({
            'number.base': 'id должен быть числовым',
            'any.required': 'id обязателен'
        }),
        
        
        garage_id: Joi.number().required().external(checkGarageIdExsists).messages({
            'number.base': 'garage_id должен быть числовым',
            'any.required': 'garege_id обязателен'
        }),
        serial_number: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,12}$')).required().messages({
            'string.base': 'Серийный номер должен быть строкой',
            'string.empty': 'Серийный номер не может быть пустым',
            'string.pattern.base': 'Серийный номер должен содержать только буквы и цифры (8-12 символов)',
            'any.required': 'Серийный номер обязателен',
        })
    }),

    updateDisk: Joi.object({
        id: Joi.number().required().external(checkDiskIdExists).messages({
            'number.base': 'brand_id должен быть числовым',
            'any.required': 'brand_id обязателен'
        }),
        model_id: Joi.number().required().external(checkModelIdExists).messages({
            'number.base': 'id должен быть числовым',
            'any.required': 'id обязателен'
        }),       
        garage_id: Joi.number().required().external(checkGarageIdExsists).messages({
            'number.base': 'garage_id должен быть числовым',
            'any.required': 'garege_id обязателен'
        }),
        serial_number: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,12}$')).required().messages({
            'string.base': 'Серийный номер должен быть строкой',
            'string.empty': 'Серийный номер не может быть пустым',
            'string.pattern.base': 'Серийный номер должен содержать только буквы и цифры (8-12 символов)',
            'any.required': 'Серийный номер обязателен',
        })
    })
}

export default Schemas;