import Gender from '../models/gender.js';
import  ApiError from '../utils/ApiError.js';

class GenderService {
    async getAllGenders() {
        return await Gender.find();
    }

    async getGenderById(genderId) {
        const gender = await Gender.findByPk(genderId);
        if (!gender) {
        throw new ApiError(404, 'Gender not found');
        }
        return gender;
    }

    async getGenderByValue(genderValue) {
        const gender = await Gender.findOne({ where: { value: genderValue } });
        if (!gender) {
        throw new ApiError(404, 'Gender not found');
        }
        return gender;
    }
}

export default new GenderService();