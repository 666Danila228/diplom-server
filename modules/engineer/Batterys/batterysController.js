import BaseController from '../../utils/baseController.js';
import batteryService from './batterysService.js'; 
import Schemas from '../../../validations/engineer/Battery/index.js';

class BatteryController extends BaseController {
    // Бренд шин
    async createBrandbattery(req, res) {
        await super.createRecord(
            req, res,
            (data) => batteryService.createBrandbattery(data.name),
            'Бренд шины',
            Schemas.createBrandbattery
        );
    }

    async updateBrandbattery(req, res) {
        await super.updateRecord(
            req, res,
            (id, data) => batteryService.updateBrandbattery(id, data.name),
            'Бренд шины',
            Schemas.updateBrandbattery
        );
    }

    async deleteBrandbattery(req, res) {
        const { id } = req.params;
        await super.deleteRecord(
            req, res,
            () => batteryService.deleteBrandbattery(id),
            'Бренд шин'
        );
    }

    async deleteManyBrandbatterys(req, res) {
        const { ids } = req.body;
        await super.deleteManyRecords(
            req, res,
            () => batteryService.deleteManyBrandbatterys(ids),
            'Бренды шин'
        );
    }

    // Модель шин
    async createModelbattery(req, res) {
        await super.createRecord(
            req, res,
            (data) => batteryService.createModelbattery(data),
            'модель шин',
            Schemas.createModelbattery
        );
    }

    async updateModelbattery(req, res) {
        await super.updateRecord(
            req, res,
            (id, data) => batteryService.updateModelbattery(id, data),
            'модель шин',
            Schemas.updateModelbattery
        )
    }

    async deleteModelbattery(req, res) {
        const { id } = req.params;
        await super.deleteRecord(
            req, res,
            () => batteryService.deleteModelbattery(id),
            'Модель шин'
        );
    }

    async deleteManyModelbatterys(req, res) {
        const { ids } = req.body;
        await super.deleteManyRecords(
            req, res,
            () => batteryService.deleteManyModelbatterys(ids),
            'Модели шин'
        );
    }

    // Шина
    async createbattery(req, res) {
        await super.createRecord(
            req, res,
            (data) => batteryService.createbattery(data),
            'шина',
            Schemas.createbattery
        )
    }

    async updatebattery(req, res) {
        await super.updateRecord(
            req, res,
            (id, data) => batteryService.updatebattery(id, data),
            'шина',
            Schemas.updatebattery
        )
    }

    async deletebattery(req, res) {
        const { id } = req.params;
        await super.deleteRecord(
            req, res,
            () => batteryService.deletebattery(id),
            'Шина'
        );
    }

    async deleteManybatterys(req, res) {
        const { ids } = req.body;
        await super.deleteManyRecords(
            req, res,
            () => batteryService.deleteManybatterys(ids),
            'Шины'
        );
    }

    async batteryWriteOff(req, res) {
        await super.createRecord(
            req, res, 
            (data) => batteryService.batteryWriteOff(data),
            'шина'
        )
    }
}

export default new BatteryController();