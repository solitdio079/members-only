const express = require("express")
const generalController = require("../controllers/generalController")
const router = express.Router()

router.use(express.urlencoded({extended: true}))
router.get("/", generalController.homeMembers)

router.get("/join", generalController.getPasscode)
router.post("/join", generalController.createMember)

module.exports = router