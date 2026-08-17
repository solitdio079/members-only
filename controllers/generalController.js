const db = require("../db/queries")

require("dotenv").config()
function getPasscode(req,res,next) {
      res.locals.errors = null 
    return res.render("passcode")
}

async function createMember(req,res,next){
    res.locals.errors = null 
    const id = req.user?.id
    if(!id){
        res.status(403)
        res.locals.errors = {
            type:403,
            message: "Please log in"
        }
        return res.render("passcode")
    }
    const passcode = String(req.body.passcode || "").trim()
    const memberPasscode = process.env.PASSCODE.trim()
    const adminPasscode = process.env.ADMIN_PASSCODE.trim()

    if(passcode !== memberPasscode && passcode !== adminPasscode){
        res.status(400)
        res.locals.errors = {
            type:400,
            message: "Invalid passcode"
        }
        return res.render("passcode")
    }

    if(passcode === adminPasscode){
        await db.updateMemberStatus("admin",id)
    } else {
        await db.updateMemberStatus("member",id)
    }

    return res.redirect("/")
}


async function homeMembers(req,res,next){
    let posts
    if(!req.user) return res.redirect("/auth/login")
    if(req.user && req.user.status === 'user'){
        posts = await db.getPosts()
    }
    else {
        posts = await db.getPostsForMembers()
    }
    res.locals.user = req.user || null
   
    return res.render("index", {posts})
}


module.exports = {
    getPasscode, createMember, homeMembers
}
