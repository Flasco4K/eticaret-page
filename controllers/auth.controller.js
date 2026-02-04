const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const authService = require("../services/auth.service");

class AuthService {
    async register(req, res, next) {
        try {
            const user = await authService.register(req.body);

            res.status(201).json({
                success: true,
                message: "Kayıt Başarılı, Mailinizi Kontrol Ediniz",
                data: user
            });

        } catch (error) {
            next(error)
        }
    };

    async login(req, res, next) {
        try {
            const result = await authService.login(req.body.email, req.body.password);

            res.status(200).json({
                success: true,
                message: "Giriş Başarılı",
                data: result
            })

        } catch (error) {
            next(error)
        }
    };

    async verify(req, res, next) {
        try {
            const { email, code } = req.body;
            const result = await authService.verifyEmail(email,code);
            res.status(200).json({
                success: true,
                message: result.message
            })
        } catch (error) {
            next(error)
        }
    };
}
module.exports = new AuthService();