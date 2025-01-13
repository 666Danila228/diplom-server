import Joi from "joi";
import prisma from "../../../prisma/prismaClient.js";
import { checkRecordExists } from "../../../utils/checkRecordExists.js";

const checkBrandCarNameExists = async (name) => {
    if (!name) return;
    await checkRecordExists('бренд машины', 'brandCar', 'name', name, false)
}

const checkBrandIdExists = async (brand_id) => {
    if (!brand_id) return;
    await checkRecordExists('бренд машины', 'brandCar', 'id', brand_id, true)
}

const checkModelIdExists = async (model_id) => {
    if (!model_id) return;
    await checkRecordExists('модели машин', 'modelCar', 'id', model_id, true);
}

const checkModelCarNameExists = async (name) => {
    if (!name) return;
    await checkRecordExists('модель машины машины', 'modelCar', 'name', name, false)
}

const checkTypeIdExists = async (type_id) => {
    if (!type_id) {
        return;
    }
    await checkRecordExists('модели машин', 'modelCar', 'id', type_id, true);
}


const checkTypeCarNameExists = async (name) => {
    if (!name) return;
    await checkRecordExists('тип машины', 'typeCar', 'name', name, false);
};

const checkDrivingCategoryIdExists = async (driving_category_id) => {
    if (!driving_category_id) return;
    await checkRecordExists('категория управления', 'drivingCategory', 'id', driving_category_id, true);
}

const checkGarageIdExists = async (garage_id) => {
    if (!garage_id) {
        return;
    }
    await checkRecordExists('гарж айди', 'garage', 'id', garage_id, true);
}

const checkAvtoServiceIdExsist = async (avtoService_id) => {
    if (!avtoService_id) return;
    await checkRecordExists('Автосервис', 'service', 'id', avtoService_id, true);
}

const checkVinBodyUnique = async (vin_body) => {
    if (!vin_body) return;
    await checkRecordExists('Vin рамы', 'car', 'vin_body', vin_body, false)
}

const checkVinEngineUnique = async (vin_engine) => {
    if (!vin_engine) return;
    await checkRecordExists('Vin engine', 'car', 'vin_engine', vin_engine, false)
}

const checkCarIdExsist = async (id) => {
    if (!id) return;
    await checkRecordExists('машина', 'car', 'id', id, true);
}


const Schemas = {
    createBrandCar: Joi.object({
        name: Joi.string().min(3).max(100).required().external(checkBrandCarNameExists).messages({
            'string.base': 'Название бренда машины должно быть строкой',
            'string.empty': 'Название бренда машины не может быть пустым',
            'string.min': 'Название бренда машины должно быть не менее {#limit} символов',
            'string.max': 'Название бренда машины должно быть не более {#limit} символов',
            'any.required': 'Название бренда машины обязательно',
        }),
    }),

    updateBrandCar: Joi.object({
        id: Joi.number().required().external(checkBrandIdExists).messages({
            'number.base': 'brand_id должен быть числовым',
            'any.required': 'brand_id обязателен'
        }),
        name: Joi.string().min(3).max(100).required().external(checkBrandCarNameExists).messages({
            'string.base': 'Название бренда машины должно быть строкой',
            'string.empty': 'Название бренда машины не может быть пустым',
            'string.min': 'Название бренда машины должно быть не менее {#limit} символов',
            'string.max': 'Название бренда машины должно быть не более {#limit} символов',
            'any.required': 'Название бренда машины обязательно',
        }),
    }),

    createModelCar: Joi.object({
        brand_id: Joi.number().required().external(checkBrandIdExists).messages({
            'number.base': 'brand_id должен быть числовым',
            'any.required': 'brand_id обязателен'
        }),
        name: Joi.string().min(3).max(100).required().external(checkModelCarNameExists).messages({
            'string.base': 'Название модели машины должно быть строкой',
            'string.empty': 'Название модели машины не может быть пустым',
            'string.min': 'Название модели машины должно быть не менее {#limit} символов',
            'string.max': 'Название модели машины должно быть не более {#limit} символов',
            'any.required': 'Название модели машины обязательно',
        }),
    }),

    updateModelCar: Joi.object({
        id: Joi.number().required().external(checkModelIdExists).messages({
            'number.base': 'id должен быть числовым',
            'any.required': 'id обязателен'
        }),
        brand_id: Joi.number().external(checkBrandIdExists).optional().messages({
            'number.base': 'brand_id должен быть числовым',
            'any.required': 'brand_id обязателен'
        }),
        name: Joi.string().min(3).max(100).optional().external(checkModelCarNameExists).messages({
            'string.base': 'Название модели машины должно быть строкой',
            'string.empty': 'Название модели машины не может быть пустым',
            'string.min': 'Название модели машины должно быть не менее {#limit} символов',
            'string.max': 'Название модели машины должно быть не более {#limit} символов',
            'any.required': 'Название модели машины обязательно',
        }),
    }),

    createTypeCar: Joi.object({
        name: Joi.string().min(3).max(50).required().external(checkTypeCarNameExists).messages({
            'string.base': 'Название типа автомобиля должно быть строкой',
            'string.empty': 'Название типа автомобиля не может быть пустым',
            'string.min': 'Название типа автомобиля должно быть не менее {#limit} символов',
            'string.max': 'Название типа автомобиля должно быть не более {#limit} символов',
            'any.required': 'Название типа автомобиля обязательно',
        }),
        interval_to: Joi.number().positive().required().messages({
            'number.base': 'Интервал ТО должен быть числом',
            'number.positive': 'Интервал ТО должен быть положительным числом',
            'any.required': 'Интервал ТО обязателен',
        }),
    }),

    updateTypeCar: Joi.object({
        id: Joi.number().required().external(checkTypeIdExists).messages({
            'number.base': 'id должен быть числовым',
            'any.required': 'id обязателен',
        }),
        name: Joi.string().min(3).max(50).optional().external(checkTypeCarNameExists).messages({
            'string.base': 'Название типа автомобиля должно быть строкой',
            'string.empty': 'Название типа автомобиля не может быть пустым',
            'string.min': 'Название типа автомобиля должно быть не менее {#limit} символов',
            'string.max': 'Название типа автомобиля должно быть не более {#limit} символов',
        }),
        interval_to: Joi.number().positive().optional().messages({
            'number.base': 'Интервал ТО должен быть числом',
            'number.positive': 'Интервал ТО должен быть положительным числом',
        }),
    }),

    createCar: Joi.object({
        model_car_id: Joi.number().required().external(checkModelIdExists).messages({
            'number.base': 'model_car_id должен быть числовым',
            'any.required': 'model_car_id обязателен',
        }),
        year_of_realise: Joi.date().iso().required().messages({
            'date.base': 'Год выпуска должен быть датой',
            'date.format': 'Год выпуска должен быть в формате ISO (YYYY-MM-DD)',
            'any.required': 'Год выпуска обязателен',
        }),
        type_car_id: Joi.number().required().external(checkTypeIdExists).messages({
            'number.base': 'type_car_id должен быть числовым',
            'any.required': 'type_car_id обязателен',
        }),
        color: Joi.string().min(3).max(50).required().messages({
            'string.base': 'Цвет должен быть строкой',
            'string.empty': 'Цвет не может быть пустым',
            'string.min': 'Цвет должен быть не менее {#limit} символов',
            'string.max': 'Цвет должен быть не более {#limit} символов',
            'any.required': 'Цвет обязателен',
        }),
        horse_power: Joi.number().positive().required().messages({
            'number.base': 'Мощность (л.с.) должна быть числом',
            'number.positive': 'Мощность (л.с.) должна быть положительным числом',
            'any.required': 'Мощность (л.с.) обязательна',
        }),
        kilowatt_hour: Joi.number().positive().optional().messages({
            'number.base': 'Мощность (кВт) должна быть числом',
            'number.positive': 'Мощность (кВт) должна быть положительным числом',
        }),
        passport_number: Joi.string().min(5).max(20).required().messages({
            'string.base': 'Номер паспорта должен быть строкой',
            'string.empty': 'Номер паспорта не может быть пустым',
            'string.min': 'Номер паспорта должен быть не менее {#limit} символов',
            'string.max': 'Номер паспорта должен быть не более {#limit} символов',
            'any.required': 'Номер паспорта обязателен',
        }),
        fuel_type: Joi.string().valid('PETROL', 'DIESEL', 'ELECTRIC', 'HYBRID').required().messages({
            'string.base': 'Тип топлива должен быть строкой',
            'any.required': 'Тип топлива обязателен',
            'any.only': 'Тип топлива должен быть одним из: PETROL, DIESEL, ELECTRIC, HYBRID',
        }),
        engine_capacity: Joi.number().positive().required().messages({
            'number.base': 'Объем двигателя должен быть числом',
            'number.positive': 'Объем двигателя должен быть положительным числом',
            'any.required': 'Объем двигателя обязателен',
        }),
        transmission_type: Joi.string().valid('MECHANICAL', 'AUTOMATIC', 'STEPLESS', 'ROBOTIC').required().messages({
            'string.base': 'Тип трансмиссии должен быть строкой',
            'any.required': 'Тип трансмиссии обязателен',
            'any.only': 'Тип трансмиссии должен быть одним из: MECHANICAL, AUTOMATIC, STEPLESS, ROBOTIC',
        }),
        driving_category_id: Joi.number().required().external(checkDrivingCategoryIdExists).messages({
            'number.base': 'driving_category_id должен быть числовым',
            'any.required': 'driving_category_id обязателен',
        }),
        driveType: Joi.string().valid('FRONT', 'REAR', 'ALL').required().messages({
            'string.base': 'Тип привода должен быть строкой',
            'any.required': 'Тип привода обязателен',
            'any.only': 'Тип привода должен быть одним из: FRONT, REAR, ALL',
        }),
        mileage: Joi.number().positive().required().messages({
            'number.base': 'Пробег должен быть числом',
            'number.positive': 'Пробег должен быть положительным числом',
            'any.required': 'Пробег обязателен',
        }),
        garage_id: Joi.number().optional().external(checkGarageIdExists).messages({
            'number.base': 'garage_id должен быть числовым',
        }),
        photo: Joi.string().optional().messages({
            'string.base': 'Фото должно быть строкой',
        }),
        service_id: Joi.number().optional().external(checkAvtoServiceIdExsist).messages({
            'number.base': 'service_id должен быть числовым',
        }),
        vin_body: Joi.string().required().external(checkVinBodyUnique).messages({
            'string.base': 'VIN кузова должен быть строкой',
            'string.empty': 'VIN кузова не может быть пустым',
            'any.required': 'VIN кузова обязателен',
        }),
        vin_engine: Joi.string().required().external(checkVinEngineUnique).messages({
            'string.base': 'VIN двигателя должен быть строкой',
            'string.empty': 'VIN двигателя не может быть пустым',
            'any.required': 'VIN двигателя обязателен',
        }),
    }),

    updateCar: Joi.object({
        id: Joi.number().required().external(checkCarIdExsist).messages({
            'number.base': 'id должен быть числовым',
        }),
        model_car_id: Joi.number().optional().external(checkModelIdExists).messages({
            'number.base': 'model_car_id должен быть числовым',
        }),
        year_of_realise: Joi.date().iso().optional().messages({
            'date.base': 'Год выпуска должен быть датой',
            'date.format': 'Год выпуска должен быть в формате ISO (YYYY-MM-DD)',
        }),
        type_car_id: Joi.number().optional().external(checkTypeIdExists).messages({
            'number.base': 'type_car_id должен быть числовым',
        }),
        color: Joi.string().min(3).max(50).optional().messages({
            'string.base': 'Цвет должен быть строкой',
            'string.empty': 'Цвет не может быть пустым',
            'string.min': 'Цвет должен быть не менее {#limit} символов',
            'string.max': 'Цвет должен быть не более {#limit} символов',
        }),
        horse_power: Joi.number().positive().optional().messages({
            'number.base': 'Мощность (л.с.) должна быть числом',
            'number.positive': 'Мощность (л.с.) должна быть положительным числом',
        }),
        kilowatt_hour: Joi.number().positive().optional().messages({
            'number.base': 'Мощность (кВт) должна быть числом',
            'number.positive': 'Мощность (кВт) должна быть положительным числом',
        }),
        passport_number: Joi.string().min(5).max(20).optional().messages({
            'string.base': 'Номер паспорта должен быть строкой',
            'string.empty': 'Номер паспорта не может быть пустым',
            'string.min': 'Номер паспорта должен быть не менее {#limit} символов',
            'string.max': 'Номер паспорта должен быть не более {#limit} символов',
        }),
        fuel_type: Joi.string().valid('PETROL', 'DIESEL', 'ELECTRIC', 'HYBRID').optional().messages({
            'string.base': 'Тип топлива должен быть строкой',
            'any.only': 'Тип топлива должен быть одним из: PETROL, DIESEL, ELECTRIC, HYBRID',
        }),
        engine_capacity: Joi.number().positive().optional().messages({
            'number.base': 'Объем двигателя должен быть числом',
            'number.positive': 'Объем двигателя должен быть положительным числом',
        }),
        transmission_type: Joi.string().valid('MECHANICAL', 'AUTOMATIC', 'STEPLESS', 'ROBOTIC').optional().messages({
            'string.base': 'Тип трансмиссии должен быть строкой',
            'any.only': 'Тип трансмиссии должен быть одним из: MECHANICAL, AUTOMATIC, STEPLESS, ROBOTIC',
        }),
        driving_category_id: Joi.number().optional().external(checkDrivingCategoryIdExists).messages({
            'number.base': 'driving_category_id должен быть числовым',
        }),
        driveType: Joi.string().valid('FRONT', 'REAR', 'ALL').optional().messages({
            'string.base': 'Тип привода должен быть строкой',
            'any.only': 'Тип привода должен быть одним из: FRONT, REAR, ALL',
        }),
        mileage: Joi.number().positive().optional().messages({
            'number.base': 'Пробег должен быть числом',
            'number.positive': 'Пробег должен быть положительным числом',
        }),
        garage_id: Joi.number().optional().external(checkGarageIdExists).messages({
            'number.base': 'garage_id должен быть числовым',
        }),
        photo: Joi.string().optional().messages({
            'string.base': 'Фото должно быть строкой',
        }),
        service_id: Joi.number().optional().external(checkAvtoServiceIdExsist).messages({
            'number.base': 'service_id должен быть числовым',
        }),
        vin_body: Joi.string().optional().external(checkVinBodyUnique).messages({
            'string.base': 'VIN кузова должен быть строкой',
            'string.empty': 'VIN кузова не может быть пустым',
        }),
        vin_engine: Joi.string().optional().external(checkVinEngineUnique).messages({
            'string.base': 'VIN двигателя должен быть строкой',
            'string.empty': 'VIN двигателя не может быть пустым',
        }),
    })
}

export default Schemas;