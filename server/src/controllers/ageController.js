import ageService from "../services/ageService.js";

class AgeController {
    async createAge(req, res, next) {
        try {
            const age = await ageService.createAge(req.body);
            res.status(201).json(age);
        } catch (error) {
            //console.log(error)
            next(error);
        }
    }

    async getAgeById(req, res, next) {
        try {
            const age = await ageService.getAgeById(req.params.id);
            res.status(200).json(age);
        } catch (error) {
            next(error);
        }
    }

    async getAllAges(req, res, next) {
        try {
            const ages = await ageService.getAllAges();
            res.status(200).json(ages);
        } catch (error) {
            next(error);
        }
    }

    async updateAge(req, res, next) {
        try {
            const age = await ageService.updateAge(req.params.id, req.body);
            res.status(200).json(age);
        } catch (error) {
            next(error);
        }
    }

    async deleteAge(req, res, next) {
        try {
            await ageService.deleteAge(req.params.id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default new AgeController();