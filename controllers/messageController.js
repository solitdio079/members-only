const db = require("../db/queries")
const {format} = require("date-fns")
function getNewPostForm(req,res,next){
    if(!req.user) return res.redirect("/auth/login")
    res.render("newMessage",{error: null})
}


async function createPost(req,res,next){
    if(!req.user) return res.redirect("/auth/login")

    const {title, content} = req.body
    const date = new Date()
    const created_at = format(date, "MMMM d, yyyy");
    const member_id = req.user.id

   
   try {
    await db.createPost(title,content,created_at,member_id)
   } catch (error) {
    res.render("newMessage", {error:error.message})
   } 
    return res.redirect("/")

}

async function deletePost(req,res,next){
    const {id} = req.body
    if(!req.user || req.user.status !== 'admin') return res.redirect("/")
    await db.deletePost(id)
    return res.redirect("/")
}


module.exports = {
    getNewPostForm,
    createPost,
    deletePost
}