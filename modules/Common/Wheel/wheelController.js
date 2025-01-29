import BaseController from "../../utils/baseController.js";
import WheelService from "./wheelService.js";
// import Schemas from "../../../validations/";

class WheelController extends BaseController {
    async getAllWheels(req, res) {
        const { where, orderBy, include, skip, take } = req.query;

        const options = {
            where: where ? JSON.parse(where) : undefined,
            orderBy: orderBy ? JSON.parse(orderBy) : undefined,
            include: include ? JSON.parse(include) : undefined,
            skip: skip ? parseInt(skip) : undefined,
            take: take ? parseInt(take) : undefined,
        };
        
        return super.getAllRecords(
            req, res,
            () => WheelService.getAllWheels(options),
            "Колёс"
        )
    }

    async getWheelById(req, res) {
        const { id } = req.params;
        await super.getRecordById(
            req, res,
            () => WheelService.getWheelById(id),
            "Колесо"
        )
    }
}

export default new WheelController()