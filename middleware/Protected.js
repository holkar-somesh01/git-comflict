const expressAsyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")

exports.userProtected = (req, res, next) => {
    const { user } = req.cookies
    if (!user) {
        return res.status(400).json({ message: "No Cookie Found" })
    }
    jwt.verify(user, process.env.JWT_KEY, (error, decode) => {
        if (error) {
            console.log(error)
            return res.json({ message: "Invalid Token" })
        }
        req.user = decode.userId
        next()
    })
}
