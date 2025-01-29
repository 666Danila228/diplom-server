import BaseService from '../../utils/baseService.js';
import prisma from '../../../prisma/prismaClient.js';

const mapOilType = (type) => {
    switch (type) {
        case 'FULL_SYNTHETIC':
            return 'Полностью синтетическое';
        case 'SEMI_SYNTHETIC':
            return 'Полусинтетическое';
        case 'MINERAL':
            return 'Минеральное';
        default:
            return 'Неизвестный тип';
    }
};

class EngineOilsService extends BaseService {
    // Бренды
    async getAllBrandEngineOils(options = {}) {
        const defaultOptions = {
            include: {
                // Включите сюда необходимые связи, если они есть
            },
        };
    
        if (options.where && typeof options.where !== 'object') {
            throw new Error('Параметр where должен быть объектом');
        }
    
        if (options.where) {
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
    
        const brandEngineOils = await super.getAllRecords('brandEngineOil', finalOptions);
    
        return brandEngineOils.map((brand) => ({
            ...brand,
            // Добавьте дополнительные поля, если необходимо
        }));
    }

    async getBrandEngineOilById(id) {
        return this.getRecordById('brandEngineOil', id, 'Бренд Моторных масел');
    }


    // Модели Моторных масел

    async getAllModelEngineOils(options = {}) {
        const defaultOptions = {
            include: {
                brand: true,
            },
        };
    
        if (options.where && typeof options.where !== 'object') {
            throw new Error('Параметр where должен быть объектом');
        }
    
        if (options.where) {
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
    
        const modelEngineOils = await super.getAllRecords('modelEngineOil', finalOptions);
    
        return modelEngineOils.map((model) => ({
            ...model,
            brand: undefined,
            brandName: model.brand.name,
        }));
    }

    async getModelEngineOilById(id) {
        const modelEngineOil = await this.getRecordById('modelEngineOil', id, 'модель Моторных масел', {
            brand: true,
        });

        return {
            ...modelEngineOil,
            brandName: modelCoolant.brand.name,
        };
    }

    // Моторное масло

    async getAllEngineOils(options = {}) {
        const defaultOptions = {
            include: {
                ModelEngineOil: {
                    include: {
                        brand: true,
                    },
                },
                Garage: true,
            },
        };

        if (options.where && typeof options.where !== 'object') {
            throw new Error('Параметр where должен быть объектом');
        }

        if (options.where) {
            for (const key in options.where) {
                if (key === 'lifespan' && typeof options.where[key] === 'number') {
                    options.where[key] = {
                        equals: options.where[key],
                    };
                } else if (key === 'type' && typeof options.where[key] === 'string') {
                    options.where[key] = {
                        equals: options.where[key],
                    };
                } else if (typeof options.where[key] === 'string') {
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

        const engineOils = await super.getAllRecords('EngineOil', finalOptions);

        return engineOils.map((engineOil) => ({
            ...engineOil,
            modelName: engineOil.ModelEngineOil?.name,
            brandName: engineOil.ModelEngineOil?.brand?.name,
            garageName: engineOil.Garage?.name,
            type: mapOilType(engineOil.ModelEngineOil.type),
            ModelEngineOil: undefined,
            Garage: undefined,
        }));
    }


    

    async getEngineOilById(id) {
        const engineOil = await this.getRecordById('EngineOil', id, 'Моторное масло', {
            ModelEngineOil: {
                include: {
                    brand: true,
                },
            },
            Garage: true
        });

        return {
            ...engineOil,
            modelName: engineOil.ModelEngineOil.name,
            brandName: engineOil.ModelEngineOil.brand.name,
            garageName: engineOil.Garage?.name,
            type: mapOilType(engineOil.type),
            ModelEngineOil: undefined,
        };
    }
}

export default new EngineOilsService();