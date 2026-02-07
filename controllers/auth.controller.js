const authService = require("../services/auth.service");

class AuthController {
  async register(req, res, next) {
    try {
      const user = await authService.register(req.body);
      res.status(201).json({ success: true, data: user });
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const result = await authService.login(
        req.body.email,
        req.body.password
      );
      res.json({ success: true, ...result });
    } catch (err) {
      next(err);
    }
  }

  async verify(req, res, next) {
    try {
      const result = await authService.verifyEmail(
        req.body.email,
        req.body.code
      );
      res.json({ success: true, message: result.message });
    } catch (err) {
      next(err);
    }
  }
}
module.exports = new AuthController();
