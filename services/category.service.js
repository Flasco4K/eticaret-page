const categoryRepository = require("../repository/category.repository");

class CategoryService {
    async createCategory(categoryData) {
        const existingCategory = await categoryRepository.findOneByName(categoryData.name);

        if (existingCategory) {
            throw new Error("Bu Kategori Zaten Mevcut");
        }

        const newCategory = await categoryRepository.create(categoryData);
        return newCategory;
    };

    async getAllCategory() {
        const category = await categoryRepository.findAll();
        return category;
    };

    async deleteCategory(id) {
        const deletedCategory = await categoryRepository.delete(id);
        if (!deletedCategory) {
            throw new Error("Silinecek Kategori Bulunamadı");
        };
        return deleteCategory;
    };
};

module.exports = new CategoryService();