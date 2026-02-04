const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: 'stmp.gmail.com', //gmail sunucusu
    port: 465, //SSL için Güvenli Port
    secure: true, //Port 465 olduğu için true
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

module.exports = transporter;