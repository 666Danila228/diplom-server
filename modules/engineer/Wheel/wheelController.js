import BaseController from "../../utils/baseController.js";
import WheelService from "./wheelService.js";
// import Schemas from "../../../validations/";

class WheelController extends BaseController {
    async createWheel(req, res) {
        await super.createRecord(
            req, res,
            (data) => WheelService.createWheel(data),
            'шина',
        )
    }
}

export default new WheelController()