import Joi from "joi";
import prisma from "../../../prisma/prismaClient.js";
import { checkRecordExists } from "../../../utils/checkRecordExists.js";

const checkCarIdExists = async (car_id) => {
    if (!car_id) return;
    await checkRecordExists('машина', 'car', 'id', car_id, true);
};

const checkFuelCardIdExists = async (id) => {
    if (!id) return;
    await checkRecordExists('топливная карта', 'fuelCard', 'id', id, true);
};

const checkFuelType = (value, helpers) => {
    const validTypes = ['PETROL', 'DIESEL', 'ELECTRIC', 'HYBRID'];
    if (!validTypes.includes(value)) {
        return helpers.error('any.invalid');
    }
    return value;
};

// Проверка существования model_car_id
const checkModelCarIdExists = async (model_car_id) => {
    if (!model_car_id) return;
    await checkRecordExists('модель машины', 'modelCar', 'id', model_car_id, true);
};

// Проверка существования type_car_id
const checkTypeCarIdExists = async (type_car_id) => {
    if (!type_car_id) return;
    await checkRecordExists('тип машины', 'typeCar', 'id', type_car_id, true);
};

const Schemas = {
    // Создание топливной карты
    createFuelCardSchema: Joi.object({
        car_id: Joi.number().required().external(checkCarIdExists).messages({
            'number.base': 'car_id должен быть числом',
            'any.required': 'car_id обязателен',
        }),
        fuels: Joi.array()
            .items(
                Joi.object({
                    fuel_type: Joi.string()
                        .required()
                        .custom(checkFuelType, 'Проверка типа топлива')
                        .messages({
                            'string.base': 'Тип топлива должен быть строкой',
                            'any.required': 'Тип топлива обязателен',
                            'any.invalid': 'Тип топлива должен быть одним из: PETROL, DIESEL, ELECTRIC, HYBRID',
                        }),
                    daily_rate: Joi.number().positive().required().messages({
                        'number.base': 'Дневная норма должна быть числом',
                        'number.positive': 'Дневная норма должна быть положительным числом',
                        'any.required': 'Дневная норма обязательна',
                    }),
                })
            )
            .min(1)
            .max(2) // Максимум 2 вида топлива
            .required()
            .messages({
                'array.base': 'fuels должен быть массивом',
                'array.min': 'Должен быть указан хотя бы один вид топлива',
                'array.max': 'Можно указать не более двух видов топлива',
                'any.required': 'fuels обязателен',
            }),
    }),

    // Обновление топливной карты
    updateFuelCardSchema: Joi.object({
        id: Joi.number().required().external(checkFuelCardIdExists).messages({
            'number.base': 'id должен быть числом',
            'any.required': 'id обязателен',
        }),
        fuels: Joi.array()
            .items(
                Joi.object({
                    fuel_type: Joi.string()
                        .required()
                        .custom(checkFuelType, 'Проверка типа топлива')
                        .messages({
                            'string.base': 'Тип топлива должен быть строкой',
                            'any.required': 'Тип топлива обязателен',
                            'any.invalid': 'Тип топлива должен быть одним из: PETROL, DIESEL, ELECTRIC, HYBRID',
                        }),
                    daily_rate: Joi.number().positive().required().messages({
                        'number.base': 'Дневная норма должна быть числом',
                        'number.positive': 'Дневная норма должна быть положительным числом',
                        'any.required': 'Дневная норма обязательна',
                    }),
                })
            )
            .min(1)
            .max(2) // Максимум 2 вида топлива
            .optional()
            .messages({
                'array.base': 'fuels должен быть массивом',
                'array.min': 'Должен быть указан хотя бы один вид топлива',
                'array.max': 'Можно указать не более двух видов топлива',
            }),
    }),

    // Создание записи в истории расходов топлива
    createFuelCardHistorySchema: Joi.object({
        fuel_card_id: Joi.number().required().external(checkFuelCardIdExists).messages({
            'number.base': 'fuel_card_id должен быть числом',
            'any.required': 'fuel_card_id обязателен',
        }),
        fuel_type: Joi.string()
            .required()
            .custom(checkFuelType, 'Проверка типа топлива')
            .messages({
                'string.base': 'Тип топлива должен быть строкой',
                'any.required': 'Тип топлива обязателен',
                'any.invalid': 'Тип топлива должен быть одним из: PETROL, DIESEL, ELECTRIC, HYBRID',
            }),
        used_amount: Joi.number().positive().required().messages({
            'number.base': 'Количество использованного топлива должно быть числом',
            'number.positive': 'Количество использованного топлива должно быть положительным числом',
            'any.required': 'Количество использованного топлива обязательно',
        }),
    }),

    // Привязка водителя к топливной карте
    assignUserToFuelCardSchema: Joi.object({
        fuelCardId: Joi.number().required().external(checkFuelCardIdExists).messages({
            'number.base': 'fuelCardId должен быть числом',
            'any.required': 'fuelCardId обязателен',
        }),
        userId: Joi.number().required().messages({
            'number.base': 'userId должен быть числом',
            'any.required': 'userId обязателен',
        }),
    }),

    // Отвязка водителя от топливной карты
    unassignUserFromFuelCardSchema: Joi.object({
        fuelCardId: Joi.number().required().external(checkFuelCardIdExists).messages({
            'number.base': 'fuelCardId должен быть числом',
            'any.required': 'fuelCardId обязателен',
        }),
    }),

    createFuelConsumptionRateSchema: Joi.object({
        model_car_id: Joi.number().required().external(checkModelCarIdExists).messages({
            'number.base': 'model_car_id должен быть числом',
            'any.required': 'model_car_id обязателен',
        }),
        type_car_id: Joi.number().required().external(checkTypeCarIdExists).messages({
            'number.base': 'type_car_id должен быть числом',
            'any.required': 'type_car_id обязателен',
        }),
        fuel_type: Joi.string()
            .required()
            .custom(checkFuelType, 'Проверка типа топлива')
            .messages({
                'string.base': 'Тип топлива должен быть строкой',
                'any.required': 'Тип топлива обязателен',
                'any.invalid': 'Тип топлива должен быть одним из: PETROL, DIESEL, ELECTRIC, HYBRID',
            }),
        daily_rate: Joi.number().positive().required().messages({
            'number.base': 'Дневная норма должна быть числом',
            'number.positive': 'Дневная норма должна быть положительным числом',
            'any.required': 'Дневная норма обязательна',
        }),
    }),

    // Обновление стандартной нормы расхода топлива
    updateFuelConsumptionRateSchema: Joi.object({
        id: Joi.number().required().messages({
            'number.base': 'id должен быть числом',
            'any.required': 'id обязателен',
        }),
        model_car_id: Joi.number().optional().external(checkModelCarIdExists).messages({
            'number.base': 'model_car_id должен быть числом',
        }),
        type_car_id: Joi.number().optional().external(checkTypeCarIdExists).messages({
            'number.base': 'type_car_id должен быть числом',
        }),
        fuel_type: Joi.string()
            .optional()
            .custom(checkFuelType, 'Проверка типа топлива')
            .messages({
                'string.base': 'Тип топлива должен быть строкой',
                'any.invalid': 'Тип топлива должен быть одним из: PETROL, DIESEL, ELECTRIC, HYBRID',
            }),
        daily_rate: Joi.number().positive().optional().messages({
            'number.base': 'Дневная норма должна быть числом',
            'number.positive': 'Дневная норма должна быть положительным числом',
        }),
    }),
};

export default Schemas;