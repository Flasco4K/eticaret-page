const userRepository = require("../repository/user.repository")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


class AuthService {
    async register(userData) {
        const existingUser = await UserRepository.findByEmail(userData.email);

        if (existingUser) {
            throw new Error("Böyle Bir Kullanici Var!")
        };

        const hashedPassword = await bcrypt.hash(userData.password, 10);
        userData.password = hashedPassword;

        const newUser = await UserRepository.create(userData);
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
    }
};

module.exports = new AuthService();