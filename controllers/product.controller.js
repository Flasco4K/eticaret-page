const Product = require("../models/product.model");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const productService = require("../services/product.service");

class ProductController {
    async createProduct(req, res, next) {
        try {
            const productData = {
                ...req.body,
                createdBy: req.user.id
            };

            const newProduct = await productService.createProduct(productData);

            res.status(201).json({
                success: true,
                message: "Ürün Başarıyla Eklendi",
                data: newProduct
            });
        } catch (error) {
            next(error);
        };
    };

    async getAllProduct(req, res, next) {
        try {
            const products = await productService.getAllProducts();

            res.status(200).json({
                success: true,
                message: "Tüm Ürünler Başarıyla Getirildi",
                data: products
            });
        } catch (error) {
            next(error);
        }
    };

    async getProductById(req, res, next) {
        try {
            const { id } = req.params.id;

            const product = await productService.getProductById(id);
            res.status(200).json({
                success: true,
                message: "Ürün Detayı Getirildi!",
                data: product
            });
        } catch (error) {
            next(error);
        }
    };

    async updateProduct(req, res, next) {
        try {

            const id = req.params.id;
            const data = req.body;

            const updatedProduct = await productService.updateProduct(id, data);
            res.status(200).json({
                success: true,
                message: "Ürün Başarıyla Güncellendi",
                data: updatedProduct
            });
        } catch (error) {
            next(error);
        }
    };

    async deleteProduct(req, res, next) {
        try {

            const id = req.params.id;

            const deletedProduct = await productService.deleteProduct(id);
            res.status(200).json({
                success: true,
                message: "Ürün Başarıyla Silindi",
                data: deletedProduct
            });
        } catch (error) {
            next(error);
        }
    };

}