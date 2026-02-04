const productRepository = require("../repository/product.repository");

class ProductService {
    async createProduct(productData) {
        if (productData.price <= 0) {
            throw new Error("Ürün Fiyatı 0`dan Büyük Olmalı")
        }
        if (productData.stock < 0) {
            throw new Error("Stok Miktarı 0 Olamaz");
        }

        const newProduct = await productRepository.create(productData);

        return newProduct;
    };

    async getAllProducts() {
        const products = await productRepository.findAll(); 
        return products;
    };

    async getProductById(productId){
        const product = await productRepository.findById(productId);

        if(!product) {
            throw new Error("Aradığınız Ürün Bulunamadı");
        }

        return product;
    };

    async updateProduct(id,productData){
        const updatedProduct = await productRepository.update(id,productData);
        if(!updatedProduct){
            throw new Error("Güncellenecek Ürün Bulunamadı!");
        }
        return updatedProduct
    };

    async deleteProduct(id){
        const deletedProduct = await productRepository.delete(id);
        if(!deletedProduct) {
            throw new Error("Silinecek Ürün Bulunamadı");
        }
        return deletedProduct
    }; 
}

module.exports = new ProductService();