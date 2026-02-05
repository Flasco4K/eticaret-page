const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const AuthService = require("../services/auth.service");

class authController {
    async register(req, res, next) {
        try {
            const { username, email, password } = req.body;
            // Servise giderken username eksik gitmemeli
            const user = await AuthService.register({ username, email, password });
            res.status(201).json({ success: true, data: user });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    };

    async login(req, res, next) {
        try {
            const result = await AuthService.login(req.body.email, req.body.password);

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
            const result = await AuthService.verifyEmail(email, code);
            res.status(200).json({
                success: true,
                message: result.message
            })
        } catch (error) {
            next(error)
        }
    };
}
module.exports = new authController();