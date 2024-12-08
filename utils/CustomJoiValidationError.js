import Joi from 'joi';

export class CustomJoiValidationError extends Joi.ValidationError {
    constructor(message, details, original) {
        super(message, details, original);
        this.name = 'CustomJoiValidationError';
    }
}