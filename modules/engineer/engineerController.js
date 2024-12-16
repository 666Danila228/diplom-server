import EngineerService from './engineerService.js';
import prisma from '../../prisma/prismaClient.js';
import { handleValidationError } from "../../validations/errorHandler.js";

class EngineerController {
    async createBrandTire(req, res) {
        try {
            const value = await Schemas.createBrandTireSchema.validateAsync(req.body, { abortEarly: false });
    
            const name = value.name; 

            const newBrandTire = await EngineerService.createBrandTire(name);
    
            res.status(200).json({ message: 'Бренд успешно создан: ', newBrandTire });
        } catch (error) {
            const errors = {};
    
            if (error.isJoi) {
                Object.assign(errors, handleValidationError(error));
    
                return res.status(400).json({ errors });
            }
                  
            console.error(error);
            res.status(400).json({ message: error.message });
        }
    }

    async getAllBrandTires(req,res) {
        try {
            const brandTires = await  EngineerService.getAllBrandTires();
            res.status(200).json({message: 'Список брендов шин: ', brandTires});
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: error.message });
        }
    }

    async updateBrandTire(req, res) {
        try {
            const { id } = req.params;
            const { name } = req.body
        } catch (error) {
            const errors = {};
    
            if (error.isJoi) {
                Object.assign(errors, handleValidationError(error));
    
                return res.status(400).json({ errors });
            }
                  
            console.error(error);
            res.status(400).json({ message: error.message });
        }
    }

    async createModelTire(req, res) {
        try {
            const value = await Schemas.createModelTire.validateAsync(req.body, { abortEarly: false });

            const newModelTire = await EngineerService.createModelTire(value);

            res.status(200).json({ message: 'Модель успешно создана: ', newModelTire });
        } catch (error) {
            const errors = {};
    
            if (error.isJoi) {
                Object.assign(errors, handleValidationError(error));
    
                return res.status(400).json({ errors });
            }
    
            if (error.message === "Данный бренд шин уже существует") {
                return res.status(409).json({ errors: { name: error.message } });
            }
    
            console.error(error);
            res.status(400).json({ message: error.message });
        }
    }

    async getAllModelTires(req,res) {
        try {
            const modelTires = await  EngineerService.getAllModelTires();
            res.status(200).json({message: 'Список моделей шин: ', modelTires});
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: error.message });
        }
    }

    async createTire(req, res) {
        try {
            const value = await Schemas.createTire.validateAsync(req.body, { abortEarly: false });

            const newTire = await EngineerService.createTire(value);
            
            res.status(200).json({ message: 'Шина успешно создана', newTire });
        } catch (error) {
            const errors = {};
    
            if (error.isJoi) {
                Object.assign(errors, handleValidationError(error));
    
                return res.status(400).json({ errors });
            }
                  
            console.error(error);
            res.status(400).json({ message: error.message });
        }
    }

    async getAllTires(req,res) {
        try {
            const tires = await  EngineerService.getAllTires();
            res.status(200).json({message: 'Список шин: ', tires});
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: error.message });
        }
    }
}


export default new EngineerController();