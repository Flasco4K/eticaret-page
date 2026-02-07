const userRepo = require("../repository/user.repository");
const mailService = require("./mail.service");
const jwt = require("jsonwebtoken");

class AuthService {
  async register(data) {
    const exists = await userRepo.findByEmail(data.email);
    if (exists) throw new Error("Bu e-posta zaten kullanımda");

    const code = mailService.generateVerificationCode();

    const user = await userRepo.create({
      ...data,
      verificationCode: code,
      verificationCodeExpires: Date.now() + 10 * 60 * 1000
    });

    // external servis → try-catch OK
    try {
      await mailService.sendVerificationEmail(user.email, code);
    } catch (err) {
      console.error("Mail gönderilemedi:", err.message);
    }

    return user;
  }

  async login(email, password) {
    const user = await userRepo.findByEmail(email);
    if (!user) throw new Error("Geçersiz bilgiler");

    if (user.status === "blocked")
      throw new Error("Hesap engellenmiş");

    if (!user.isVerified)
      throw new Error("E-posta doğrulanmamış");

    const match = await user.comparePassword(password);
    if (!match) throw new Error("Geçersiz bilgiler");

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return { token, user };
  }

  async verifyEmail(email, code) {
    const user = await userRepo.findByEmail(email);
    if (!user) throw new Error("Kullanıcı bulunamadı");

    if (
      user.verificationCode !== code ||
      user.verificationCodeExpires < Date.now()
    ) {
      throw new Error("Kod geçersiz veya süresi dolmuş");
    }

    user.isVerified = true;
    user.status = "active";
    user.verificationCode = null;
    user.verificationCodeExpires = null;

    await user.save();
    return { message: "Hesap doğrulandı" };
  }
}

module.exports = new AuthService();
