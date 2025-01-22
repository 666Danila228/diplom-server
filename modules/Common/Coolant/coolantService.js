import BaseService from '../../utils/baseService.js';
import prisma from '../../../prisma/prismaClient.js';

class CoolantsService extends BaseService {
    // Бренд тасола
    async getAllBrandCoolants() {
        return super.getAllRecords('brandCoolant');
    }

    async getBrandCoolantById(id) {
        return this.getRecordById('brandCoolant', id, 'Бренд тасола');
    }

    // Модели тасола

    async getAllModelCoolants() {
        const modelCoolants = await super.getAllRecords('modelCoolant', { include: { brand: true, }, });

        return modelCoolants.map((model) => ({
            ...model,
            brandName: model.brand.name,
        }))
    }

    async getModelCoolantById(id) {
        const modelCoolant = await this.getRecordById('modelCoolant', id, 'модель тасола', {
            brand: true,
        });

        return {
            ...modelCoolant,
            brandName: modelCoolant.brand.name, // Используем brandName
        };
    }


    // тасолаа
    async getAllCoolants() {
        const coolants = await super.getAllRecords('Coolant', {
            include: {
                ModelCoolant: {
                    include: {
                        brand: true, // Включаем бренд
                    },
                },
            },
        });
    
        return coolants.map((coolant) => ({
            ...coolant,
            modelName: coolant.ModelCoolant?.name,
            brandName: coolant.ModelCoolant?.brand?.name,
            ModelCoolant: undefined, 
        }));
    }

    async getCoolantById(id) {
        const coolant = await this.getRecordById('Coolant', parseInt(id), 'Тосол', {
            ModelCoolant: {
                include: {
                    brand: true,
                },
            },
        });

        return {
            ...coolant,
            modelName: coolant.ModelCoolant.name,
            brandName: coolant.ModelCoolant.brand.name,
            ModelCoolant: undefined,
        };
    }



}

export default new CoolantsService();