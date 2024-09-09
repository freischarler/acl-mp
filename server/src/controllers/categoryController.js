import categoryService from "../services/categoryService.js";

class CategoryController {
    async createCategory(req, res, next) {
        try {
            const category = await categoryService.createCategory(req.body);
            res.status(201).json(category);
        } catch (error) {
            //console.log(error)
            next(error);
        }
    }

    async getCategoryById(req, res, next) {
        try {
            const category = await categoryService.getCategoryById(req.params.id);
            res.status(200).json(category);
        } catch (error) {
            next(error);
        }
    }

    async getAllCategorys(req, res, next) {
        try {
            const categorys = await categoryService.getAllCategorys();
            res.status(200).json(categorys);
        } catch (error) {
            next(error);
        }
    }

    async updateCategory(req, res, next) {
        try {
            const category = await categoryService.updateCategory(req.params.id, req.body);
            res.status(200).json(category);
        } catch (error) {
            next(error);
        }
    }

    async deleteCategory(req, res, next) {
        try {
            await categoryService.deleteCategory(req.params.id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default new CategoryController();