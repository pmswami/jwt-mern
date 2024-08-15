const jwt = require("jsonwebtoken");
const ensureAuthenticated = (req, res, next) => {
    const authToken = req.headers["authorization"];
    if (!authToken) {
        return res.status(403).json({ message: "unauthorized, JWT token is required" });
    }
    try {
        const decodedData = jwt.verify(authToken, process.env.JWT_SECRET);
        req.user = decodedData;
        next();
    }
    catch (err) {
        return res.status(403).json({ message: "Unauthorized, JWT token is invalid" });
    }
};

module.exports = { ensureAuthenticated };