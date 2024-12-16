import prisma from "../../prisma/prismaClient.js";
import { checkRecordExists } from "../../utils/checkRecordExists.js";


class EngineerService {
    async createBrand(model, name, entityName) {
        try {
            await checkRecordExists(entityName, model, 'name', name, false);

            const newBrand = await prisma[model].create({
                data: {name},
            });

            return newBrand;
        } catch (error) {
            console.error(error);
            throw new Error(`Не удалось создать ${entityName}`, 500);
        }
    }

    async createModel(model, data, entityName) {
        try {
            await checkRecordExists(entityName, model, 'name', data.name, false);
            
            const newModel = await prisma[model].create({
                data,
            });

            return newModel;
        } catch (error) {
            console.error(error);
            throw new Error(`Не удалось создать ${entityName}`, 500);
        }
    }

    async getAllRecords(model, entityName) {
        try {
            const records = await prisma[model].findMany();
            
            return records;
        } catch (error) {
            console.error(error);
            throw new Error(`Не удалось вывести ${entityName}`, 500);
        }
    }

    async updateRecord(model, id, newData, entityName) {
        try {
            await checkRecordExists(entityName, model, 'id', id, true);

            const updateRecord = await prisma[model].update({
                where: { id: parseInt(id) },
                data: newData,
            });

            return updateRecord;
        } catch (error) {
            console.error(error);
            throw new Error(`Не удалось изменить ${entityName}`, 500);
        }
    }




    async createBrandTire(name) {
        return this.createBrand('brandTire', name, 'бренд шин');
    }

    async getAllBrandTires(){
        return this.getAllRecords('brandTire', 'бренды шин') 
    }

    async updateBrandTire(id, newName){
        return this.updateRecord('brandTire', id, { name: newName }, 'бренд шины');
    }

    async createModelTire(modelData) {
        return this.createModel('modelTire', modelData, 'модель шин');
    }

    async getAllModelTires(){
        return this.getAllRecords('modelTire', 'модели шин');
    }

    async createTire(tireData) {
        try {
            const newTire = await prisma.tire.create({
                data: tireData
            });

            return newTire;
        } catch (error) {
            console.error(error);
            throw new Error("Не удалось создать шину", 500)
        }
    }

    async getAllTires(){
        try {
            const tires =  await prisma.tire.findMany()
            return tires
        } catch (error) {
            console.error(error);
            throw new Error("Не удалось вывести шины", 500);
        }   
    }
}

export default new EngineerService();