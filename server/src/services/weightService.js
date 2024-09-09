import Weight from '../models/weight.js';
import ApiError from '../utils/ApiError.js';

class WeightService {
    async createWeight(weightData) {
        return Weight.create(weightData);
    }

    async getAllWeights() {
        return await Weight.findAll();
    }

    async getWeightById(weightId) {
        const weight = await Weight.findByPk(weightId);
        if (!weight) {
            throw new ApiError(404, 'Weight not found');
        }
        return weight;
    }

    async getWeightByValue(weightValue) {
        const weight = await Weight.findOne({ where: { value: weightValue } });
        if (!weight) {
            throw new ApiError(404, 'Weight not found');
        }
        return weight;
    }
}

export default new WeightService();

