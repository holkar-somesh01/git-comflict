const router = require("express").Router()
const AuthController = require("../controller/auth.controller")
router
    .post("/register", AuthController.registerUser)
    .post("/login", AuthController.loginUser)
    .post("/logout", AuthController.logoutUser)


module.exports = router