import BaseController from "../../utils/baseController.js";
import WheelService from "./wheelService.js";
import Schemas from "./../../../validations/engineer/Wheel/index.js";

class WheelController extends BaseController {
    async createWheel(req, res) {
        const data = req.body;

        await super.createRecord(
            req, res,
            () => WheelService.createWheel(data),
            'шина',
            Schemas.createWheel
        )
    }

    async updateWheel(req, res) {
        const { id } = req.params;
        const data = req.body;

        await super.updateRecord(
            req, res,
            () => WheelService.updateRecord(id, data),
            'шина',
            Schemas.updateRecord
        )
    }
}

export default new WheelController()