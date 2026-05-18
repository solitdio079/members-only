const express = require("express")
const {Router} = require("express")
const signupController = require("../controllers/signupController") 
const loginController = require("../controllers/loginController")
const passport = require("passport")
const router = Router()
require("../utils/configure")

router.get("/signup",signupController.getCreateForm)
router.post("/signup-password",signupController.createMember)

router.get("/login",loginController.getLoginForm)

router.post("/login",passport.authenticate('local', {successRedirect: "/", failureRedirect: "/auth/login"}))

router.post('/logout', loginController.logout
);

module.exports = router