import styleService from "../services/styleService.js";

class StyleController {
    async createStyle(req, res, next) {
        try {
            const style = await styleService.createStyle(req.body);
            res.status(201).json(style);
        } catch (error) {
            //console.log(error)
            next(error);
        }
    }

    async getStyleById(req, res, next) {
        try {
            const style = await styleService.getStyleById(req.params.id);
            res.status(200).json(style);
        } catch (error) {
            next(error);
        }
    }

    async getAllStyles(req, res, next) {
        try {
            const styles = await styleService.getAllStyles();
            res.status(200).json(styles);
        } catch (error) {
            next(error);
        }
    }

    async updateStyle(req, res, next) {
        try {
            const style = await styleService.updateStyle(req.params.id, req.body);
            res.status(200).json(style);
        } catch (error) {
            next(error);
        }
    }

    async deleteStyle(req, res, next) {
        try {
            await styleService.deleteStyle(req.params.id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default new StyleController();
