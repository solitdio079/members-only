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
    if(passcode !== process.env.PASSCODE){
        res.locals.errors = {
            type:404,
            message: "Invalid passcode"
        }
        return res.render("passcode")
    }else{
        await db.updateMemberStatus("member",id)
        return res.redirect("/")
    }
}


module.exports = {
    getPasscode, createMember
}