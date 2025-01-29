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
            brandName: modelCoolant.brand.name,
        };
    }


    // тасола
    async getAllCoolants() {
        const coolants = await super.getAllRecords('Coolant', {
            include: {
                ModelCoolant: {
                    include: {
                        brand: true,
                    },
                },
            },
        });

        return coolants.map((coolant) => ({
            id: coolant.id,
            model_id: coolant.model_id,
            volume: coolant.volume,
            garage_id: coolant.garage_id,
            created_at: coolant.created_at,
            deletedAt: coolant.deletedAt,
            modelName: coolant.ModelCoolant?.name,
            brandName: coolant.ModelCoolant?.brand?.name,
            type: coolant.ModelCoolant?.type,
            freezing_point: coolant.ModelCoolant?.freezing_point,
            boiling_point: coolant.ModelCoolant?.boiling_point,
            composition: coolant.ModelCoolant?.composition,
            expiration_date: coolant.ModelCoolant?.expiration_date,
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
            id: coolant.id,
            model_id: coolant.model_id,
            volume: coolant.volume,
            garage_id: coolant.garage_id,
            created_at: coolant.created_at,
            deletedAt: coolant.deletedAt,
            modelName: coolant.ModelCoolant.name,
            brandName: coolant.ModelCoolant.brand.name,
            type: coolant.ModelCoolant.type,
            freezing_point: coolant.ModelCoolant.freezing_point,
            boiling_point: coolant.ModelCoolant.boiling_point,
            composition: coolant.ModelCoolant.composition,
            expiration_date: coolant.ModelCoolant.expiration_date,
        };
    }



}

export default new CoolantsService();