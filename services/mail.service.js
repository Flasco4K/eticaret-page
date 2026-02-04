const transporter = require("../config/mail.config");

class MailService {
    // 6 Haneli rastgele doğrulama kodu üretir
    generateVerificationCode() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    // Kullanıcıya doğrulama kodunu mail olarak uçurur
    async sendVerificationEmail(to, code) {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: to,
            subject: "E-Ticaret Onay Kodu",
            html: `
                <div style="font-family: Arial, sans-serif; text-align: center;">
                    <h2>Hoş Geldiniz</h2>
                    <p>Hesabınızı onaylamak için kullanmanız gereken kod:</p>
                    <h1 style="color: #4CAF50;">${code}</h1>
                    <p>Bu kod 10 dakika geçerlidir.</p>
                </div>
            `
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log(`[MAIL] Onay kodu ${to} adresine gitti!`);
        } catch (error) {
            console.error("[MAIL ERROR]", error);
            throw new Error("Mail gönderilemedi!");
        }
    }
}

module.exports = new MailService();