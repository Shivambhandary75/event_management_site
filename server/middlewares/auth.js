const jwt = require("jsonwebtoken")

const authenticate = async (req, res, next) => {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token)
        return res.status(401).json({ message: "Access denied. No token provided." });

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next()
    } catch (error) {
        return res.status(400).json({ message: "Invalid token." })
    }
};

const authorizeRoles = (...roles) => {
    return async (req, res, next) => {
        if(!roles.includes(req.user.role))
            return res.status(403).json({ message: "Access denied. No token provided." });
        next();
    };
};

module.exports = { authenticate, authorizeRoles };