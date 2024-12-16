import { handleValidationError } from '../../../validations/errorHandler.js';

class BaseController {
    async createRecord(req, res, serviceMethod, entityName, validationSchema) {
        try {
            if (validationSchema) {
                const value = await validationSchema.validateAsync(req.body, { abortEarly: false });
                req.body = value; 
            }

            const data = req.body;
            const newRecord = await serviceMethod(data);
            res.status(201).json({ message: `${entityName} успешно создан`, record: newRecord });
        } catch (error) {
            if (error.isJoi) {
                const errors = handleValidationError(error);
                return res.status(400).json({ errors });
            }
            console.error(error);
            res.status(error.status || 400).json({ message: error.message });
        }
    }

    async getAllRecords(req, res, serviceMethod, entityName) {
        try {
            const records = await serviceMethod();
            res.status(200).json({ message: `Список ${entityName}`, records });
        } catch (error) {
            console.error(error);
            res.status(error.status || 400).json({ message: error.message });
        }
    }

    async getRecordById(req, res, serviceMethod, entityName) {
        try {
            const { id } = req.params;
            const record = await serviceMethod(id);
            res.status(200).json({ message: `${entityName} успешно найден`, record });
        } catch (error) {
            console.error(error);
            res.status(error.status || 400).json({ message: error.message });
        }
    }

    async updateRecord(req, res, serviceMethod, entityName, validationSchema) {
        try {
            if (validationSchema) {
                const value = await validationSchema.validateAsync({ ...req.body, id: req.params.id }, { abortEarly: false });
                req.body = value; 
            }

            const { id } = req.params;
            const data = req.body;
            const updatedRecord = await serviceMethod(id, data);
            res.status(200).json({ message: `${entityName} успешно обновлен`, record: updatedRecord });
        } catch (error) {
            if (error.isJoi) {
                const errors = handleValidationError(error);
                return res.status(400).json({ errors });
            }
            console.error(error);
            res.status(error.status || 400).json({ message: error.message });
        }
    }
}

export default BaseController;