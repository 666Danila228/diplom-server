import prisma from "../../prisma/prismaClient.js";
import { checkRecordExists } from "../../utils/checkRecordExists.js";


class EngineerService {
        async createBrandTire(name) {
        try {
            await checkRecordExists('бренд шин','brabdTire', 'name', name, false);

            const newBrandTire = await prisma.brandTire.create({
                data: {
                    name,
                },
            });

            return newBrandTire;
        } catch (error) {
            console.error(error);
            throw new Error("Не удалось создать бренд шины", 500);
        }
    }

    async getAllBrandTires(){
        try {
            const brandTires =  await prisma.brandTire.findMany()
            return brandTires
        } catch (error) {
            console.error(error);
            throw new Error("Не удалось вывести бренды шин", 500);
        }   
    }

    async change

    async createModelTire(modelData) {
        try {
            await checkRecordExists('модели шин', 'modelTire', 'name', modelData.name, false);

            const newModelTire = await prisma.modelTire.create({
                data: modelData
            });

            return newModelTire;
        } catch (error) {
            console.error(error);
            throw new Error("Не удалось создать модель шин", 500)
        }
    }

    async getAllModelTires(){
        try {
            const modelTires =  await prisma.modelTire.findMany()
            return modelTires
        } catch (error) {
            console.error(error);
            throw new Error("Не удалось вывести модели шин", 500);
        }   
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