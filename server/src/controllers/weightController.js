import eventParametersService from "../services/eventParametersService.js";
import weightService from "../services/weightService.js";

class WeightController {
    async createWeight(req, res, next) {
        try {
            const weight = await weightService.createWeight(req.body);
            res.status(201).json(weight);
        } catch (error) {
            //console.log(error)
            next(error);
        }
    }

    async getWeightById(req, res, next) {
        try {
            const weight = await weightService.getWeightById(req.params.id);
            res.status(200).json(weight);
        } catch (error) {
            next(error);
        }
    }

    async getAllWeights(req, res, next) {
        try {
            const weights = await weightService.getAllWeights();
            res.status(200).json(weights);
        } catch (error) {
            next(error);
        }
    }

    async updateWeight(req, res, next) {
        try {
            const weight = await weightService.updateWeight(req.params.id, req.body);
            res.status(200).json(weight);
        } catch (error) {
            next(error);
        }
    }

    async deleteWeight(req, res, next) {
        try {
            await weightService.deleteWeight(req.params.id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

    async getWeightsByEventId(req, res, next) {
        try {
            const eventParameters = await eventParametersService.getEventParametersByEvents(req.params.eventId);
            //with eventParameters we can get all the weights
            console.log(eventParameters)
            const weights = await weightService.getWeightById(eventParameters.weight_id);

            res.status(200).json(weights);
        } catch (error) {
            console.log(error)
            next(error);
        }
    }
}

export default new WeightController();