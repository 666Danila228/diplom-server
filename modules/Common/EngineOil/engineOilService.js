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
        return super.getAllRecords('brandEngineOil');
    }

    async getBrandEngineOilById(id) {
        return this.getRecordById('brandEngineOil', id, 'Бренд Моторных масел');
    }


    // Модели Моторных масел

    async getAllModelEngineOils() {
        const modelEngineOils = await super.getAllRecords('modelEngineOil', { include: { brand: true, }, });
        return modelEngineOils.map((model) => ({
            ...model,
            brandName: model.brand.name,
        }))
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

        // Проверяем, что where является объектом
        if (options.where && typeof options.where !== 'object') {
            throw new Error('Параметр where должен быть объектом');
        }

        // Если where передан, корректируем фильтры
        if (options.where) {
            for (const key in options.where) {
                if (key === 'lifespan' && typeof options.where[key] === 'number') {
                    // Для числовых полей используем equals
                    options.where[key] = {
                        equals: options.where[key],
                    };
                } else if (key === 'type' && typeof options.where[key] === 'string') {
                    // Для enum используем оператор equals
                    options.where[key] = {
                        equals: options.where[key],
                    };
                } else if (typeof options.where[key] === 'string') {
                    // Для строк используем contains
                    options.where[key] = {
                        contains: options.where[key],
                        mode: 'insensitive',
                    };
                }
            }
        }

        // Объединяем include из defaultOptions и options
        const mergedInclude = {
            ...defaultOptions.include,
            ...(options.include || {}),
        };

        // Создаем finalOptions
        const finalOptions = {
            ...defaultOptions,
            ...options,
            include: mergedInclude,
        };

        console.log('Final Options:', finalOptions); // Логирование для отладки

        const engineOils = await super.getAllRecords('EngineOil', finalOptions);

        return engineOils.map((engineOil) => ({
            ...engineOil,
            modelName: engineOil.ModelEngineOil?.name,
            brandName: engineOil.ModelEngineOil?.brand?.name,
            garageName: engineOil.Garage?.name,
            type: mapOilType(engineOil.type),
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