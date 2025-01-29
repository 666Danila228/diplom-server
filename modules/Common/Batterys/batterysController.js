import BaseController from '../../utils/baseController.js';
import batteryService from './batterysService.js'; 
import Schemas from '../../../validations/engineer/Battery/index.js';

class BatteryController extends BaseController {
    // Бренд шин
    async getAllBrandbatterys(req, res) {
        await super.getAllRecords(req, res, batteryService.getAllBrandbattery, 'брендов шин');
    }

    async getBrandbatteryById(req, res) {
        await super.getRecordById(
            req, res,
            (id) => batteryService.getBrandbatteryById(id),
            'Бренд шин'
        );
    }

    // Модель шин
    async getAllModelbatterys(req, res) {
        await super.getAllRecords(req, res, batteryService.getAllModelbatterys, 'моделей шин');
    }

    async getModelbatteryById(req, res) {
        await super.getRecordById(
            req, res,
            (id) => batteryService.getModelbatteryById(id),
            'модель шин'
        );
    }

    // Шина
    async getAllbatterys(req, res) {
        await super.getAllRecords(req, res, batteryService.getAllbatterys, 'дисков');
    }

    async getbatteryByid(req, res) {
        await super.getRecordById(
            req, res,
            (id) => batteryService.getbatteryById(id),
            'шина'
        )
    }
}

export default new BatteryController();