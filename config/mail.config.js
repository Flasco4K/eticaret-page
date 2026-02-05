const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // 1. DÜZELTME: 'stmp' değil 'smtp' olmalı
    port: 465, 
    secure: true, 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
 
    tls: {
        rejectUnauthorized: false
    }
});

module.exports = transporter;