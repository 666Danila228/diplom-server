import BaseController from "../../utils/baseController";
import TOService from "../../engineer/TO/toService";

class TOController extends BaseController {
    async addConsumables(req, res) {
        const { toId } = req.params;
        const { consumables } = req.body;

        await super.createRecord(
            req, res,
            () => TOService.addConsumables(toId, consumables),
            'дОБАВЛЕНИЕ РАСХОДНИКОВ',
            Schemas.addConsumablesSchema
        )
    }

    // Завершение ТО
    async completeTO(req, res) {
        const { id } = req.params;
        const data = req.body;

        // Валидация данных перед завершением ТО
        await super.validateData(Schemas.completeTO, data);

        try {
            const updatedTO = await TOService.completeTO(id, data);
            res.status(200).json(updatedTO);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    // Отмена ТО
    async cancelTO(req, res) {
        const { id } = req.params;
        const { reason } = req.body;

        try {
            const updatedTO = await TOService.cancelTO(id, reason);
            res.status(200).json(updatedTO);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    // Принятие заявки на ТО мастером
    async acceptTO(req, res) {
        const { id } = req.params;
        const { masterId } = req.body;

        try {
            const updatedTO = await TOService.acceptTO(id, masterId);
            res.status(200).json(updatedTO);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

export default new TOController();