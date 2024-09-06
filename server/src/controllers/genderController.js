import genderService from "../services/genderService.js";

class GenderController {
    async getAllGenders(req, res, next) {
        try {
            const genders = await genderService.getAllGenders();
            res.status(200).json(genders);
        } catch (error) {
            next(error);
        }
    }

    
    async getGenderById(req, res, next) {
        try {
            const gender = await genderService.getGenderById(req.params.id);
            res.status(200).json(gender);
        } catch (error) {
            next(error);
        }
    }

}

export default new GenderController();