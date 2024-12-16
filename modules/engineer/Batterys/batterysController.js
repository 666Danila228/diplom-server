import BaseController from "../utils/baseController.js";
import BatteryService from "./batterysService.js";
import Schemas from "../../../validations/engineer/Battery/index.js";

class BatteryController extends BaseController {
    // Бренд аккумуляторов
    async createBrandBattery(req, res) {
        await super.createRecord(
            req, res,
            (data) => BatteryService.createBrandBattery(data.name),
            'Бренд аккумулятора',
            Schemas.createBrandBattery
        )
    }

    async getAllBrandBattery(req, res) {
        await super.getAllRecords(req, res, BatteryService.getlAllBranвBattery, 'брендов аккумуляторво');
    }

    async getBrandBatteryById(req, res) {
        await super.getRecordById(
            req, res,
            (id) => BatteryService.getBatteryById(id),
            'Бренд аккумуляторов'
        )
    }

    async updateBrandBattery(req, res) {
        await super.updateRecord(
            req, res,
            (id, data) => BatteryService.updateBrandBattery(id, data),
            'Бренд аккумуляторов',
            Schemas.createBrandBattery
        )
    }

    // Модели
    async createModelBattery(req, res) {
        await super.createRecord(
            req, res,
            (data) => BatteryService.createModelBattery(data),
            'Модель аккумулятора',
            Schemas
        ) 
    }
}

export default new BatteryController();