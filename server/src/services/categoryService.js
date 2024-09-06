import   Categories from '../models/categories.js';
import  ApiError from '../utils/ApiError.js';

class CategoryService {
  async getAllCategories() {
    return await Categories.find();
  }

  async getCategoryById(categoryId) {
    const category = await Categories.findByPk(categoryId);
    if (!category) {
      throw new ApiError(404, 'Category not found');
    }
    return category;
  }

  async getCategoryByName(name) {
    const category = await Categories.findOne({ where: { name } });
    if (!category) {
      throw new ApiError(404, 'Category not found');
    }
    return category;
  }
}

export default new CategoryService();

