const express = require("express")
const {Router} = require("express")
const signupController = require("../controllers/signupController") 

const router = Router()

router.get("/",signupController.getCreateForm)
router.post("/",signupController.createMember)



module.exports = router