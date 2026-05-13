const express = require("express")
const generalController = require("../controllers/generalController")
const router = express.Router()

router.use(express.urlencoded({extended: true}))
router.get("/", (req,res) => {
   res.locals.user = req.user || null
    return res.render("index")
})

router.get("/join", generalController.getPasscode)
router.post("/join", generalController.createMember)

module.exports = router