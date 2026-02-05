const roleMiddleware = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ 
                message: "Bu işlemi yapmak için yetkiniz yok!" 
            });
        }
        next();
    };
};

module.exports = roleMiddleware;