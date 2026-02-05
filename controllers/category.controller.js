const categoryService = require("../services/category.service");

class CategoryController {
    async createCategory(req, res, next) {
        try {
            const categoryData = {
                ...req.body,
                createdBy: req.user.id
            };
            const newCategory = await categoryService.createCategory(categoryData);

            res.status(201).json({
                success: true,
                message: "Kategori Başarıyla Eklendi",
                data: newCategory
            });
        } catch (error) {
            next(error);
        }
    };

    async getAllCategory(req, res, next) {
        try {
            const categories = await categoryService.getAllCategory();

            res.status(200).json({
                success: true,
                data: categories
            });
        } catch (error) {
            next(error);
        }
    };

    async deleteCategory(req, res, next) {
        try {
            const id = req.params.id;
            const deletedCategory = await categoryService.deleteCategory(id);
            
            res.status(200).json({
                success: true,
                message: "Ürün Başarıyla Silindi",
                data: deletedCategory
            });

        } catch (error) {
            next(error);
        }
    };
}
module.exports = new CategoryController();