const db = require("../db/queries")

require("dotenv").config()
function getPasscode(req,res,next) {
      res.locals.errors = null 
    return res.render("passcode")
}

async function createMember(req,res,next){
    res.locals.errors = null 
    const {id} = req.user
    if(!id){
        res.locals.errors = {
            type:403,
            message: "Please log in"
        }
        return res.render("passcode")
    }
    const passcode = req.body.passcode
    if(passcode !== process.env.PASSCODE && passcode !== process.env.ADMIN_PASSCODE){
        res.locals.errors = {
            type:404,
            message: "Invalid passcode"
        }
        return res.render("passcode")
    }
    else{
        if(passcode === process.env.ADMIN_PASSCODE){
             await db.updateMemberStatus("admin",id)
        }
        if(passcode === process.env.PASSCODE){
             await db.updateMemberStatus("member",id)
        }
        return res.redirect("/")
    }
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
