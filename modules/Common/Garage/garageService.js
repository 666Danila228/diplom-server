import BaseService from "../../utils/baseService.js";
import prisma from "../../../prisma/prismaClient.js";

class GarageService extends BaseService {
    async getAllGarages(options = {}) {
        const defaultOptions = {
            include: {
                HeadColumn: {
                    select: {
                        surname: true,
                        name: true,
                        patronymic: true,
                    },
                },
            },
        };
    
        if (options.where && typeof options.where === 'object') {
            for (const key in options.where) {
                if (typeof options.where[key] === 'string') {
                    options.where[key] = {
                        contains: options.where[key],
                        mode: 'insensitive',
                    };
                }
            }
        }
    
        const mergedInclude = {
            ...defaultOptions.include,
            ...(options.include || {}),
        };
    
        const finalOptions = {
            ...defaultOptions,
            ...options,
            include: mergedInclude,
        };
    
        console.log('Final Options:', finalOptions);
    
        return super.getAllRecords('garage', finalOptions);
    }

    async getGarageById(id) {
        const garage = await this.getRecordById('garage', id, 'Гараж', {
            HeadColumn: {
                select: {
                    surname: true,
                    name: true,
                    patronymic: true,
                },
            },
        });

        return garage;
    }
}

export default new GarageService();