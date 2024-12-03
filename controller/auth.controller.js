const expressAsyncHandler = require("express-async-handler");
const Auth = require("../models/Auth");
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")

exports.registerUser = expressAsyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    const isFound = await Auth.findOne({ email })
    if (isFound) {
        return res.status(400).json({ message: "Email Alrady Exist please Login" })
    }
    const hash = await bcrypt.hash(password, 10)
    await Auth.create({ email, name, password: hash })
    res.json({ message: "Register Success" })
})

exports.loginUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body
    const isFound = await Auth.findOne({ email })
    if (!isFound) {
        return res.status(400).json({ message: "Email Alrady Exist please Login" })
    }
    const verify = await bcrypt.compare(password, isFound.password)
    if (!verify) {
        return res.status(400).json({ message: "Password Do not match" })
    }
    const token = jwt.sign({ userId: isFound._id }, process.env.JWT_KEY, { expiresIn: "1h" })
    res.cookie("user", token, { maxAge: 1000 * 60 * 60 * 24 })
    res.json({
        message: "Login Success", result: {
            _id: isFound._id,
            name: isFound.name,
            email: isFound.email
        }
    })
})
exports.logoutUser = expressAsyncHandler(async (req, res) => {
    res.clearCookie("user")
    return res.json({ message: "Logout Success" })
})

