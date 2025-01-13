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
            const { where, orderBy, include, skip, take } = req.query;

            const options = {
                where: where ? JSON.parse(where) : undefined,
                orderBy: orderBy ? JSON.parse(orderBy) : undefined,
                include: include ? JSON.parse(include) : undefined,
                skip: skip ? parseInt(skip) : undefined,
                take: take ? parseInt(take) : undefined,
            };

            const records = await serviceMethod(options);
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

    async deleteRecord(req, res, serviceMethod, entityName) {
        try {
            const { id } = req.params; 
            const result = await serviceMethod(id); 
            res.status(200).json({ message: `${entityName} успешно удален`, result });
        } catch (error) {
            console.error(error);
            res.status(error.status || 500).json({ message: error.message });
        }
    }

    async deleteManyRecords(req, res, serviceMethod, entityName) {
        try {
            const { ids } = req.body; 
            const result = await serviceMethod(ids); 
            res.status(200).json({ message: `${entityName} успешно удалены`, result });
        } catch (error) {
            console.error(error);
            res.status(error.status || 500).json({ message: error.message });
        }
    }
}

export default BaseController;