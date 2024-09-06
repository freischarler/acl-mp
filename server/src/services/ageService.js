import Age from '../models/age.js';
import  ApiError from '../utils/ApiError.js';

class AgeService {
    async createAge(ageData) {
        return Age.create(ageData);
    }

    async getAllAges() {
        return await Age.find();
    }

    async getAgeById(ageId) {
        const age = await Age.findByPk(ageId);
        if (!age) {
        throw new ApiError(404, 'Age not found');
        }
        return age;
    }

    async getAgeByType(ageType) {
        const age = await Age.findOne({ where: { type: ageType } });
        if (!age) {
        throw new ApiError(404, 'Age not found');
        }
        return age;
    }
}

export default new AgeService();