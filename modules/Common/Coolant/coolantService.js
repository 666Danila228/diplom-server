import BaseService from '../../utils/baseService.js';
import prisma from '../../../prisma/prismaClient.js';

class CoolantsService extends BaseService {
    // Бренд тасола
    async getAllBrandCoolants(options = {}) {
        return super.getAllRecords('brandCoolant', options);
    }

    async getBrandCoolantById(id) {
        return this.getRecordById('brandCoolant', id, 'Бренд тасола');
    }

    // Модели тасола

    async getAllModelCoolants(options = {}) {
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
    async getAllCoolants(options = {}) {
        const defaultOptions = {
            include: {
                ModelCoolant: {
                    include: {
                        brand: true,
                    },
                },
                Garage: true,
            },
        };
    
        // Обработка фильтрации по связанным полям
        if (options.where) {
            if (options.where.type) {
                options.where.ModelCoolant = {
                    type: {
                        equals: options.where.type,
                    },
                };
                delete options.where.type; // Удаляем type из основного where
            }
    
            // Обработка других полей
            for (const key in options.where) {
                if (key === 'freezing_point' || key === 'boiling_point' || key === 'expiration_date') {
                    if (typeof options.where[key] === 'number') {
                        options.where[key] = {
                            equals: options.where[key],
                        };
                    }
                } else if (typeof options.where[key] === 'string') {
                    options.where[key] = {
                        contains: options.where[key],
                        mode: 'insensitive',
                    };
                }
            }
        }
    
        // Объединение include
        const mergedInclude = {
            ...defaultOptions.include,
            ...(options.include || {}),
        };
    
        // Формирование финальных опций
        const finalOptions = {
            ...defaultOptions,
            ...options,
            include: mergedInclude,
        };
    
        console.log('Final Options:', finalOptions);
    
        try {
            // Получение данных из базы
            const coolants = await prisma.coolant.findMany(finalOptions);
    
            // Форматирование результата
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
                garageName: coolant.Garage?.name,
            }));
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
            throw new Error('Не удалось получить записи');
        }
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