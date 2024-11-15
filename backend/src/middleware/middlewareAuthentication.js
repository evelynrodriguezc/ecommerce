const jwt = ("jsonwebtoken")

const middlewareAutenthication = (req, res, next) => {
    const token = req.headers["athorization"]?.split("")[1]
    if(!token){
        return res.status(403).json({
            message: "Token required"
        })
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if(error){
            return res.status(401).json({ message: "Invalid Token", error: error.message })
        }
        req.user = decoded
        next()
    })
}

module.exports = middlewareAutenthication;