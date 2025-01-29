import BaseController from "../../utils/baseController.js";
import GarageService from "./garageService.js";
import Schemas from "./../../../validations/admin/garage/index.js";

class GarageController extends BaseController {
    async createGarage(req, res) {
        const data = req.body;

        await super.createRecord(
            req, res,
            () => GarageService.createGarage(data),
            'Гараж',
            Schemas.createGarage
        );
    }

    async updateGarage(req, res) {
        const { id } = req.params;
        const data = req.body;
        await super.updateRecord(
            req, res,
            () => GarageService.updateGarage(id, data),
            Schemas.updateGarage
        )
    }
}

export default new GarageController();