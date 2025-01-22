import BaseController from '../../utils/baseController.js';
import GarageService from './GarageService.js';

class GarageController extends BaseController {
    async getAllGarages(req, res) {
        const { where, orderBy, include, skip, take } = req.query;

        const options = {
            where: where ? JSON.parse(where) : undefined,
            orderBy: orderBy ? JSON.parse(orderBy) : undefined,
            include: include ? JSON.parse(include) : undefined,
            skip: skip ? parseInt(skip) : undefined,
            take: take ? parseInt(take) : undefined,
        };

        console.log('Options:', options);

        await super.getAllRecords(req, res, () => GarageService.getAllGarages(options), 'гаражи');
    }

    async getGarageById(req, res) {
        const { id } = req.params;
        
        await super.getRecordById(
            req, res,
            () => GarageService.getGarageById(id),
            'гараж'
        )
    }
}

export default new GarageController();