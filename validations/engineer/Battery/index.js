import Joi from "joi";
import { checkRecordExists } from "../../../utils/checkRecordExists.js";

const checkBrandBatteryExists = async (name) => {
    await checkRecordExists('бренд аккумулятора', 'brandBattery', 'name', name, false);
}

const Schemas = {
    createBrandBattery: Joi.object({
        name: Joi.string().min(3).max(25).pattern(new RegExp('^[a-zA-Z0-9]{1,30}$')).required().external(checkBrandBatteryExists).messages({
            'string.base': 'Название бренда должна быть строкой',
            'string.empty': 'Название бренда не может быть пустым',
            'string.min': 'Название бренда должна быть не менее {#limit} сиволов',
            'string.max': 'Название бренда должна быть не больше {#limit} сиволов',
            'string.pattern.base': 'Название бренда должно содержать только латинские буквы и цифры',
            'any.required': 'Название бренда обязателен'
        }),
    }),

    
}

export default Schemas;