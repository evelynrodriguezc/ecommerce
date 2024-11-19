const jwt = require("jsonwebtoken");

const middlewareAuthentication = (req, res, next) => {
    console.log("Middleware authentication triggered");
    const token = req.headers["authorization"]?.split(" ")[1]
    if(!token){
        return res.status(403).json({
            message: "Token required"
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if(error){
            return res.status(401).json({ message: "Invalid Token", error: error.message })
        }
        req.user = decoded
        next();
    });
};

module.exports = middlewareAuthentication;