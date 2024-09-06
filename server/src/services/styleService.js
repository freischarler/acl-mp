import Style from '../models/styles.js';
import  ApiError from '../utils/ApiError.js';

class StyleService {
    async createStyle(styleData) {
        return Style.create(styleData);
    }

    async getAllStyles() {
        return await Style.find();
    }

    async getStyleById(styleId) {
        const style = await Style.findByPk(styleId);
        if (!style) {
        throw new ApiError(404, 'Style not found');
        }
        return style;
    }

    async getStyleByValue(styleValue) {
        const style = await Style.findOne({ where: { value: styleValue } });
        if (!style) {
        throw new ApiError(404, 'Style not found');
        }
        return style;
    }
}

export default new StyleService();