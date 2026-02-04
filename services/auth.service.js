const userRepository = require("../repository/user.repository")
const mailService = require("./mail.service");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AuthService {
    async register(userData) {
        const existingUser = await UserRepository.findByEmail(userData.email);

        if (existingUser) {
            throw new Error("Böyle Bir Kullanici Var!")
        };

        // 1. Doğrulama kodunu üret
        const verificationCode = mailService.generateVerificationCode();

        userData.password = await bcrypt.hash(userData.password, 10);
        userData.verificationCode = verificationCode; // Veritabanına bu kodla gidecek

        const newUser = await UserRepository.create(userData);
        await mailService.sendVerificationEmail(newUser.email, verificationCode);
        return newUser;
    };

    async login(email, password) {
        const user = await userRepository.findByEmail(email);

        if (!user) {
            throw new Error("Kullanıcı bulunamadı!");
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            throw new Error("Şifreler Eşleşmiyor");
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )
        return { token, user: { username: user.username, email: user.email } };
    };

    async verifyEmail(email, code) {
        const user = await UserRepository.findByEmail(email);
        if (!user) throw new Error("Kullanıcı Bulunamadı");
        if (user.verificationCode !== code) throw new Error("Onay Kodu Hatalı")

        user.isVerified = true;
        user.verificationCode = null; // Mermi hedefe ulaştı, kodu siliyoruz.

        await user.save();
        return { message: "Hesabınız Onaylandı" };
    };
}
module.exports = new AuthService();