const express = require("express")

const router = express.Router()

router.get("/", (req,res) => {
    if(req.user) res.locals.user = req.user
    return res.render("index")
})

module.exports = router