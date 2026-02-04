const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Yetkisiz erişim, token bulunamadı!" });
    }

    const token = authHeader.split(' ')[1];

    try {
        // 2. Token'ı doğrula
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // 3. Kullanıcı bilgilerini isteğe ekle
        req.user = decoded;
        
        next();
    } catch (error) {
        return res.status(403).json({ message: "Geçersiz veya süresi dolmuş token!" });
    }
};

module.exports = authMiddleware;