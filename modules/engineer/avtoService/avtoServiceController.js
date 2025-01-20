import BaseController from "../../utils/baseController.js";
import AvtoServiceService from "./avtoServiceService.js";
import Schemas from "../../../validations/engineer/AvtoService/index.js";

class AvtoServiceController extends BaseController {
    async createAvtoService(req, res) {
        await super.createRecord(
            req, res,
            (data) => AvtoServiceService.createAvtoService(data),
            'Авто сервис',
            Schemas.createAvtoService
        );
    }

    async getAllAvtoService(req, res) {
        await super.getAllRecords(req, res, AvtoServiceService.getAllAvtoService, 'автосервисы');
    }

    async getAvtoServiceById(req, res) {
        await super.getRecordById(
            req, res,
            (id) => AvtoServiceService.getAvtoServiceById(id),
            'автосервис'
        );
    }

    async updateAvtoService(req, res) {
        await super.updateRecord(
            req, res,
            (id, data) => AvtoServiceService.updateAvtoService(id, data),
            Schemas.updateAvtoService
        )
    }
}

export default new AvtoServiceController();