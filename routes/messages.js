const express = require("express")
const messageControler = require("../controllers/messageController")
const router = express.Router()

router.use(express.urlencoded())

router.get("/new", messageControler.getNewPostForm)

router.post("/new", messageControler.createPost)

router.post("/delete", messageControler.deletePost)


module.exports = router