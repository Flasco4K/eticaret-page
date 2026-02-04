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
}

module.exports = new ProductService();